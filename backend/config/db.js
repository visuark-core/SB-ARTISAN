const { Pool } = require('pg');
const dotenv = require('dotenv');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

dotenv.config();

// Auto-start PostgreSQL if not running
(() => {
  const pgDataDir = path.resolve(__dirname, '../pgdata');
  const pgCtlPath = '/usr/lib/postgresql/18/bin/pg_ctl';
  const socketsDir = path.resolve(__dirname, '../sockets');
  const pgLogFile = path.resolve(__dirname, '../pg_log');
  const port = process.env.DB_PORT || '5433';

  if (!fs.existsSync(pgCtlPath)) {
    console.warn(`PostgreSQL control binary not found at ${pgCtlPath}. Skipping auto-start check.`);
    return;
  }

  let isRunning = false;
  try {
    const statusOutput = execSync(`"${pgCtlPath}" -D "${pgDataDir}" status`, { encoding: 'utf8', stdio: 'pipe' });
    if (statusOutput.includes('server is running')) {
      isRunning = true;
    }
  } catch (err) {
    isRunning = false;
  }

  if (!isRunning) {
    console.log('PostgreSQL database is not running. Starting it now...');
    try {
      if (!fs.existsSync(socketsDir)) {
        fs.mkdirSync(socketsDir, { recursive: true });
      }
      execSync(`"${pgCtlPath}" -D "${pgDataDir}" -o "-p ${port} -k '${socketsDir}'" -l "${pgLogFile}" start`, {
        stdio: 'inherit'
      });
      console.log('PostgreSQL database started successfully.');
    } catch (err) {
      console.error('Failed to start PostgreSQL database automatically:', err.message);
    }
  } else {
    console.log('PostgreSQL database is already running.');
  }
})();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 5432,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Add error listener to pool to prevent process crash
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err.message);
});

// Wrapper to mimic mysql2's execute for simple queries
// Note: This is a limited shim. Models should be updated for PostgreSQL specifics.
const db = {
  query: (text, params) => pool.query(text, params),
  execute: async (text, params) => {
    // Convert ? to $1, $2, etc.
    let index = 1;
    const pgText = text.replace(/\?/g, () => `$${index++}`);
    const res = await pool.query(pgText, params);
    return [res.rows, res.fields];
  },
  getConnection: async () => {
    const client = await pool.connect();
    // Shim for transaction support in models
    return {
      execute: async (text, params) => {
        let index = 1;
        const pgText = text.replace(/\?/g, () => `$${index++}`);
        const res = await client.query(pgText, params);
        return [res.rows, res.fields];
      },
      beginTransaction: () => client.query('BEGIN'),
      commit: () => client.query('COMMIT'),
      rollback: () => client.query('ROLLBACK'),
      release: () => client.release()
    };
  },
  pool // Expose raw pool if needed
};

// Test connection
(async () => {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully to PostgreSQL.');
    client.release();
  } catch (error) {
    console.error('Database connection failure:', error.message);
  }
})();

module.exports = db;

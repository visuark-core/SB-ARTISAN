const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

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

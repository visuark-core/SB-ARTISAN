const db = require('../config/db');

async function run() {
  console.log('Altering inquiries table...');
  try {
    await db.pool.query(`
      ALTER TABLE inquiries 
      ADD COLUMN IF NOT EXISTS location VARCHAR(255), 
      ADD COLUMN IF NOT EXISTS moq VARCHAR(100);
    `);
    console.log('Columns location and moq added successfully (or already existed).');
  } catch (error) {
    console.error('Error altering inquiries table:', error);
  } finally {
    await db.pool.end();
  }
}

run();

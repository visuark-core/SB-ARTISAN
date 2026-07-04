const db = require('../config/db');

(async () => {
  try {
    console.log("Checking blogs table schema...");
    const { rows } = await db.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'blogs' AND column_name = 'gallery_images'
    `);
    
    if (rows.length === 0) {
      console.log("Adding gallery_images column to blogs table...");
      await db.query(`ALTER TABLE blogs ADD COLUMN gallery_images TEXT DEFAULT '[]'`);
      console.log("Successfully added column gallery_images.");
    } else {
      console.log("Column gallery_images already exists.");
    }
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
})();

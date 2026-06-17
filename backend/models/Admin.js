const db = require('../config/db');

class Admin {
  static async findByEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async create({ fullName, email, passwordHash, role = 'admin' }) {
    const [rows] = await db.execute(
      'INSERT INTO admins (full_name, email, password_hash, role) VALUES (?, ?, ?, ?) RETURNING id',
      [fullName, email, passwordHash, role]
    );
    return { id: rows[0].id, fullName, email, role };
  }
}

module.exports = Admin;

const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Standardize email: if user inputs 'admin', treat as 'admin@site.com'
    let searchEmail = email;
    if (email === 'admin') {
      searchEmail = 'admin@site.com';
    }

    const admin = await Admin.findByEmail(searchEmail);
    if (!admin) {
      res.status(401);
      return next(new Error('Access Denied. Invalid email or username.'));
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      res.status(401);
      return next(new Error('Access Denied. Invalid password.'));
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'sb_artisan_golden_key_2026',
      { expiresIn: process.env.JWT_EXPIRE || '24h' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        fullName: admin.full_name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };

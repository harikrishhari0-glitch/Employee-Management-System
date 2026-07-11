const db = require("../config/db");

const User = {

  async create(user) {

    const sql = `
      INSERT INTO users
      (full_name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      user.full_name,
      user.email,
      user.password,
      user.role,
    ]);

    return result;
  },

  async findByEmail(email) {

    const sql = `
      SELECT *
      FROM users
      WHERE email = ?
    `;

    const [rows] = await db.query(sql, [email]);

    return rows[0];
  },

  async findById(id) {

    const sql = `
      SELECT *
      FROM users
      WHERE id = ?
    `;

    const [rows] = await db.query(sql, [id]);

    return rows[0];
  },

  async verifyUser(email) {

    const sql = `
      UPDATE users
      SET is_verified = TRUE
      WHERE email = ?
    `;

    return db.query(sql, [email]);
  },

  async updatePassword(email, password) {

    const sql = `
      UPDATE users
      SET password = ?
      WHERE email = ?
    `;

    return db.query(sql, [password, email]);
  },

  async saveOTP(email, otp) {

    const sql = `
      INSERT INTO otp_verifications
      (email, otp, expires_at)
      VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))
    `;

    return db.query(sql, [email, otp]);
  },

  async getLatestOTP(email) {

    const sql = `
      SELECT *
      FROM otp_verifications
      WHERE email = ?
      ORDER BY created_at DESC
      LIMIT 1
    `;

    const [rows] = await db.query(sql, [email]);

    return rows[0];
  }

};

module.exports = User;
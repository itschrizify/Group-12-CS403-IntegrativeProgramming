const pool = require("../config/database");

// Find a user by email (used for login + duplicate-email checks)
async function findByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
}

// Find a user by id (used when refreshing a token) - password excluded on purpose
async function findById(id) {
  const result = await pool.query(
    "SELECT id, name, email, created_at FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// Create a new user. Expects password to already be hashed.
async function createUser({ name, email, hashedPassword }) {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
    [name, email, hashedPassword]
  );
  return result.rows[0];
}

module.exports = { findByEmail, findById, createUser };
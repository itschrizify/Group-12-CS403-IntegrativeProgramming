const pool = require("../config/database");

// Store a refresh token when a user logs in
async function saveRefreshToken(userId, token, expiresAt) {
  await pool.query(
    "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
    [userId, token, expiresAt]
  );
}

// Look up a refresh token to check it's still valid/known
async function findRefreshToken(token) {
  const result = await pool.query("SELECT * FROM refresh_tokens WHERE token = $1", [token]);
  return result.rows[0];
}

// Remove a single refresh token - used on logout
async function deleteRefreshToken(token) {
  await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [token]);
}

// Remove every refresh token for a user - handy for "log out of all devices"
async function deleteAllUserTokens(userId) {
  await pool.query("DELETE FROM refresh_tokens WHERE user_id = $1", [userId]);
}

module.exports = { saveRefreshToken, findRefreshToken, deleteRefreshToken, deleteAllUserTokens };
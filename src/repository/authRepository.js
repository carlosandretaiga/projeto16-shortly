import db from '../database/db.js';

async function userConflitRepo(email) {
  return db.query(`
  SELECT email FROM users WHERE email = $1
  `, [email]);
}

async function insertNewUser(paramsRepo) {
  return db.query(`
  INSERT INTO users (name, email, password, "confirmPassword")
  VALUES ($1, $2, $3, $4)
  `, paramsRepo);
}

async function loginRepo(email) {
  return db.query(`
  SELECT * FROM users WHERE users.email = $1
  `, [email]);
}

export const authRepository = {
  userConflitRepo,
  insertNewUser,
  loginRepo,
}
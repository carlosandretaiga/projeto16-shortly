import db from '../database/db.js';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET_KEY } = process.env;

export async function createUser(req, res) {

  try {

    const {name, email, password, confirmPaswword} = req.body;
    console.log(user);

    const result = await db.query(`
    SELECT email FROM users WHERE email = $1
    `, [email]);

    if(result.rowCount > 0) {
      return res.sendStatus(409); //conflit existing email registration
    }

    const passwordEncrypted = bcrypt.hashSync(user.password, 10);
    const confirmPasswordEncrypted = bcrypt.hashSync(user.confirmPaswword, 10);
    
    await db.query(`
    INSERT INTO users (name, email, password, confirmPassword)
    VALUES ($1, $2, $3, $4)
    `[name, email, passwordEncrypted, confirmPasswordEncrypted]);
    res.status(201).send("user created sucessfully!");

  } catch (error) {
    res.status(500).send('There was a problem registering the user. Check the data entered.')
  } 
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.query(`
    SELECT * FROM users WHERE users.email = $1
    `[email]);

    const userNotFound = user.rows[0];

    if(userNotFound && bcrypt.compareSync(password, userNotFound.password)) {
      const token = jwt.sign({ email }, JWT_SECRET_KEY)
      return res.status(200).send({ token });
    }

    res.sendStatus(401);

  } catch (error) {
    res.status(500).send('There was a problem the login. Check the data entered.')
  }

}
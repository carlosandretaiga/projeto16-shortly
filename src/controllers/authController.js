import db from '../database/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import { authRepository } from '../repository/authRepository.js'
dotenv.config();

const { JWT_SECRET_KEY } = process.env;

export async function createUser(req, res) {

  try {
    const {name, email, password, confirmPassword} = req.body;

    const result = await authRepository.userConflitRepo(email);
    /* const result = await db.query(`
    SELECT email FROM users WHERE email = $1
    `, [email]); */


    if(result.rowCount > 0) {
      return res.sendStatus(409); //conflit existing email registration
    }

    const passwordEncrypted = bcrypt.hashSync(password, 10);
    const confirmPasswordEncrypted = bcrypt.hashSync(confirmPassword, 10);

    const paramsRepo = [name, email, passwordEncrypted, confirmPasswordEncrypted];
    
    const resultUser = await authRepository.insertNewUser(paramsRepo);
    /* await db.query(`
    INSERT INTO users (name, email, password, "confirmPassword")
    VALUES ($1, $2, $3, $4)
    `, [name, email, passwordEncrypted, confirmPasswordEncrypted]); */
    if(resultUser.rowCount > 0) {
      return res.sendStatus(201);
    }

  } catch (error) {
    res.status(422).send(error.message); 
  } 
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {

    const user = await authRepository.loginRepo(email);
   /*  const user = await db.query(`
    SELECT * FROM users WHERE users.email = $1
    `, [email]); */

    const userFound = user.rows[0];

    if(userFound && bcrypt.compareSync(password, userFound.password)) {
      const token = jwt.sign({ email }, JWT_SECRET_KEY)
      return res.status(200).send({ token });
    }

    res.sendStatus(401);

  } catch (error) {
    res.status(422).send(error.message); 
  }

}
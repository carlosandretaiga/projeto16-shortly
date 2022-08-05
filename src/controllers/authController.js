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

    const passwordEncrypted = bcrypt.hashSync(user.password, 10);
    const confirmPasswordEncrypted = bcrypt.hashSync(user.confirmPaswword, 10);
    

    res.status(201).send("user created sucessfully!");
  } catch (error) {
    
  }

  
}

export async function login(req, res) {

}
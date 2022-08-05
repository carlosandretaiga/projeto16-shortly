import db from '../database/db.js';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import bcrypt from 'bcrypt';


export async function createUser(req, res) {
  const user = req.body;
  console.log(user);

  
}

export async function login(req, res) {

}
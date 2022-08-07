import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../database/db.js';
dotenv.config();

const { JWT_SECRET_KEY } = process.env;

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;


  const checkingAuthorization = authorization?.match(/^(Bearer )/g)

  if(!checkingAuthorization) {
    return res.status(401).send("No authorization token identified in request header!");
  }

  const token = authorization?.replace("Bearer ", "").trim();


  if(!token) {
    return res.sendStatus(401);
  }

  try {

    const data = jwt.verify(token, JWT_SECRET_KEY);

    const user = await db.query(`
    SELECT users.id, users.name, users.email 
    FROM users WHERE users.email = '${data.email}'`
    );
    res.locals.user = user.rows[0];

    next();
  } catch (error) {
    res.status(500).send('There was a problem the token validator. Check the data entered.') 
  }

}
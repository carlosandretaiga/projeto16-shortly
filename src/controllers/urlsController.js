import joi from 'joi';
import db from '../database/db.js';
import { nanoid } from 'nanoid';


export async function createShorten(req, res) {
  const { user } = res.locals;
  const { url } = req.body;

  const shortUrl = nanoid(8);
  console.log(shortUrl);

  try {
    const result = await db.query(`
    INSERT INTO urls (url, "shortUrl", "userId") 
    VALUES ($1, $2, $3)
    `,[url, shortUrl, user.id]);

    res.status(201).send({ shortUrl: shortUrl });
    
  } catch (error) {
    const errors = error.details.map(detail => detail.message);
    res.status(422).send(errors);
  }

};


export async function getUrl(req, res){

};
export async function getShortUrl(req, res){

};
export async function deleteUrl(req, res){

};
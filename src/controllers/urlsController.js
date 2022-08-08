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
    res.status(422).send(error); 
  }

};

export async function getUrl(req, res){
  const { id } = req.params;

  try {
    const result = await db.query(`
    SELECT urls.id, urls."shortUrl", urls.url 
    FROM urls WHERE urls.id = $1
    `, [id]);

    console.log(result); 

    if(result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const url = result.rows[0];

    res.status(200).send(url);
  } catch (error) {
    const errors = error.details.map(detail => detail.message);
    res.status(422).send(errors);
  }
};

export async function getOpenShortUrl(req, res){
  const { shortUrl } = req.params;

  try {
    const result = await db.query(`
    SELECT urls.url, urls."visitCount"
    FROM urls WHERE urls."shortUrl" = $1`, [shortUrl]);

    if(result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const { url, visitCount } = result.rows[0];

    const updatedVisitCount = await db.query(`
    UPDATE urls SET "visitCount" = '${visitCount + 1}'
    WHERE urls."shortUrl" = $1
    `, [shortUrl]);

    res.redirect(url); 
    
  } catch (error) {
    const errors = error.details.map(detail => detail.message);
    res.status(422).send(errors);
  }
};

export async function deleteUrl(req, res){
  const { id } = req.params; 

  try {
    const result = await db.query(`
    DELETE FROM urls WHERE urls.id = $1
    `, [id]);

    if(result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
    
  } catch (error) {
    const errors = error.details.map(detail => detail.message);
    res.status(422).send(errors);
  }

};
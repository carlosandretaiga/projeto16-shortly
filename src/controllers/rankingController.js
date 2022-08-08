import joi from 'joi';
import db from '../database/db.js';

export async function getRanking(req, res) {

  try {

    const result = await db.query(`
    SELECT users.id, users.name, 
    COUNT(urls.id) AS "linksCount",
    COALESCE(SUM(URLS."visitCount"), 0) AS "visitCount"
    FROM users
    LEFT JOIN urls ON users.id = urls."userId"
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    `,);

    const ranking = result.rows;
    res.status(200).send(ranking);
    
  } catch (error) {
    res.status(422).send(error); 
  }
};
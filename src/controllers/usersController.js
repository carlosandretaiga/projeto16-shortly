import db from '../database/db.js';

export async function usersMe(req, res) {

  const { user } = res.locals;
  const id = user.id;

  try {

    const urlsResult = await db.query(`
    SELECT urls.id, urls."shortUrl" AS "shortUrl", urls.url, urls."visitCount" AS "visitCount"
    FROM users
    JOIN urls ON users.id = urls."userId"
    WHERE users.id = $1
    `, [id]); 

    const userResult = await db.query(`
    SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount"
    FROM users
    LEFT JOIN urls ON users.id = urls."userId"
    WHERE users.id = $1
    GROUP BY users.id
    `, [id]); 

    if(userResult.rowCount === 0) {
      return res.sendStatus(404);
    }

    function getUserUrlsMe(userMe, urlsMe) {
      userMe.visitCount = Number(userMe.visitCount)
      userMe.shortenedUrls = urlsMe
    
      return userMe
    }

    const userMe = getUserUrlsMe(
      userResult.rows[0],
      urlsResult.rows,
    )
 
    res.send(userMe);

  } catch (error) {
    res.status(422).send(error); 
  }
};
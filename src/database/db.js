import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg; 
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
 /*  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: process.env.PASSWORD,
  database: 'shortlydb' */
});

export default db;


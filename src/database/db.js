import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg; 
const connection = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: process.env.PASSWORD,
  database: 'shortlydb'
});


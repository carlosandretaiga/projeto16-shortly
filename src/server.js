import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/routes.js';

const app = express();
app.use(cors(), express.json());
dotenv.config();

app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(chalk.bold.green(`Server running on port ${PORT}`));
});
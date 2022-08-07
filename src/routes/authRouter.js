import { Router } from 'express';
import { validateLogin, validateUser } from '../middlewares/authValidator.js';

import { createUser, login } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/signup', validateUser, createUser);
authRouter.post('/signin', validateLogin, login);

export default authRouter;

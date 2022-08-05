import { Router } from 'express';
import { validateLogin, validateUser } from '../middlewares/authValidator';

const authRouter = Router();

authRouter.post('/signup', validateUser, createUser);
authRouter.post('/signin', validateLogin, login);

export default authRouter;

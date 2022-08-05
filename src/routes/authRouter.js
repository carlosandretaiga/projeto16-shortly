import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signup', createUser);
authRouter.post('/signin', validateLogin, login);

export default authRouter;

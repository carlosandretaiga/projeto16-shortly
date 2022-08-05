import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/users/me', usersMe);

export default usersRouter; 
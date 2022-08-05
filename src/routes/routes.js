import { Router } from 'express';

import authRouter from './authRouter';
import urlsRouter from './urlsRouter';
import usersRouter from './usersRouter';
import rankingRouter from './rankingRouter';

const router = Router();

router.use(authRouter);
router.use(urlsRouter);
router.use(usersRouter);
router.use(rankingRouter);

export default router;


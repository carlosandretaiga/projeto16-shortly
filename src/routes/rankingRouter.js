import { Router } from 'express';

const rankingRouter = Router();

rankingRouter.get('/ranking', getRanking);

export default rankingRouter;
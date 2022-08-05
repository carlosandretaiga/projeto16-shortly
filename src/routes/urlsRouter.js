import { Router } from 'express';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', createShorten);
urlsRouter.get('/urls/:id', getUrl);
urlsRouter.get('/urls/open/:shortUrl', getShortUrl);
urlsRouter.delete('/urls/:id', deleteUrl);

export default urlsRouter; 

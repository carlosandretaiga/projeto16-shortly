import { Router } from 'express';

import { createShorten, getUrl, getShortUrl, deleteUrl } from '../controllers/urlsController.js';
import { validateToken } from '../middlewares/tokenValidator.js';
import { validateUrl } from '../middlewares/urlValidator.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', validateToken, validateUrl, createShorten);
urlsRouter.get('/urls/:id', getUrl);
urlsRouter.get('/urls/open/:shortUrl', getShortUrl);
urlsRouter.delete('/urls/:id', deleteUrl);

export default urlsRouter; 

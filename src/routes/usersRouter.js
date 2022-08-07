import { Router } from 'express';

import { usersMe } from '../controllers/usersController.js'
import { validateToken } from '../middlewares/tokenValidator.js';

const usersRouter = Router();

usersRouter.get('/users/me',validateToken, usersMe);

export default usersRouter; 
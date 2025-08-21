import { Router } from 'express';
import { registerUserController, loginUserController, getUsersController } from '../controllers/usersController';
import { verifyUser } from '../middlewares/verifyUser';

export const usersRouter = Router();

usersRouter.get('/users',getUsersController);
usersRouter.post('/users/register',verifyUser,registerUserController);
usersRouter.post('/users/login', loginUserController);
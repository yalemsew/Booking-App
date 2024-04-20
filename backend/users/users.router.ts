import express, { json } from 'express';
import { signin_handler, signup_handler } from './users.handlers';

const userRouter = express.Router();

userRouter.post('/signin', json(), signin_handler);
userRouter.post('/signup', json(), signup_handler);

export default userRouter;
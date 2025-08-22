import express from 'express';
import cors from 'cors';
import { usersRouter } from './routes/usersRouter';
import tasksRouter from './routes/tasksRouter';

export const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRouter);
app.use(tasksRouter);
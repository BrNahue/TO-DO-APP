import express from 'express';
import cors from 'cors';
import { usersRouter } from './routes/usersRouter';

export const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRouter); // Mount the users router under the /api path

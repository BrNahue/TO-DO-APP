import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Task } from "../entities/Task";
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, Task],
  synchronize: true,
  //dropSchema:true,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

export const UserModel = AppDataSource.getRepository(User);
export const TaskModel = AppDataSource.getRepository(Task);
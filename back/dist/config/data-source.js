"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = exports.UserModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Task_1 = require("../entities/Task");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [User_1.User, Task_1.Task],
    synchronize: true,
    //dropSchema:true,
    ssl: process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
});
exports.UserModel = exports.AppDataSource.getRepository(User_1.User);
exports.TaskModel = exports.AppDataSource.getRepository(Task_1.Task);

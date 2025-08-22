import { Router } from "express";
import { addTaskController,getTasksController,deleteTaskController,updateTaskController } from "../controllers/tasksController";
import { JWTauth } from "../middlewares/JWTauth";

const tasksRouter = Router();

tasksRouter.post("/tasks/add",JWTauth,addTaskController);
tasksRouter.get("/tasks",JWTauth, getTasksController);
tasksRouter.delete("/tasks/delete/:id",JWTauth, deleteTaskController);
tasksRouter.put("/tasks/update/:id",JWTauth, updateTaskController);

export default tasksRouter;
import { TaskData } from "../dto/taskdataDto"
import { TaskModel,UserModel } from "../config/data-source"

export const addTaskService = async (task: TaskData) => {

    const user = await UserModel.findOneBy({ id: task.userId });
    if (!user) {
        throw new Error("User not found");
    }
    // Asocia el usuario a la tarea
    const newTask = TaskModel.create({
        title: task.title,
        description: task.description,
        completed: task.completed,
        user: user // <-- Aquí se asocia el usuario
    });
    const result = await TaskModel.save(newTask);
    return result;
}

export const getTasksService = async (Id:string) => {
    const tasks = await TaskModel.find({
        where: {
            user: {
                id: Id
            }
        }
    });
    return tasks;
}

export const deleteTaskService = async (id: string) => {
    const task = await TaskModel.findOneBy({ id });
    if (!task) {
        throw new Error("Task not found");
    }
    await TaskModel.remove(task);
}

export const updateTaskService = async (id:string) => {
    const task = await TaskModel.findOneBy({ id });
    if (!task) {
        throw new Error("Task not found");
    }
    task.completed = true;
    await TaskModel.save(task);
}

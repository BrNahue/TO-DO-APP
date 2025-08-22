import { Request,Response } from "express"
import { addTaskService,updateTaskService,deleteTaskService,getTasksService } from "../services/tasksService";
import { AuthRequest } from "../middlewares/JWTauth";

export const addTaskController = async (req: AuthRequest, res: Response) => {
    try{
        const { title, description } = req.body;
        const user = req.user;

        if (!title || !description) {
            res.status(400).json({ message: 'Campos incompletos' });
            return;
        } else {
            await addTaskService({title, description, completed: false, userId: user.id});
            res.status(201).json({ message: 'Tarea agregada con éxito' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar la tarea' });
    }
}

export const getTasksController = async (req: AuthRequest, res: Response) => {
    
    const user = req.user;    

    if (!user.id) {
        res.status(400).json({ message: 'Usuario no autenticado' });
        return;
    }

    try {
        const tasks = await getTasksService(user.id);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
}

export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteTaskService(id);
        res.status(200).json({ message: 'Tarea eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
}

export const updateTaskController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;

        if (completed===true) {
            res.status(400).json({ message: 'Tarea ya completada' });
            return;
        }

        const updatedTask = await updateTaskService(id);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
}

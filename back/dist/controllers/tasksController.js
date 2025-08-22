"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskController = exports.deleteTaskController = exports.getTasksController = exports.addTaskController = void 0;
const tasksService_1 = require("../services/tasksService");
const addTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const user = req.user;
        if (!title || !description) {
            res.status(400).json({ message: 'Campos incompletos' });
            return;
        }
        else {
            yield (0, tasksService_1.addTaskService)({ title, description, completed: false, userId: user.id });
            res.status(201).json({ message: 'Tarea agregada con éxito' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al agregar la tarea' });
    }
});
exports.addTaskController = addTaskController;
const getTasksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user.id) {
        res.status(400).json({ message: 'Usuario no autenticado' });
        return;
    }
    try {
        const tasks = yield (0, tasksService_1.getTasksService)(user.id);
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
});
exports.getTasksController = getTasksController;
const deleteTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, tasksService_1.deleteTaskService)(id);
        res.status(200).json({ message: 'Tarea eliminada con éxito' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
});
exports.deleteTaskController = deleteTaskController;
const updateTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        if (completed === true) {
            res.status(400).json({ message: 'Tarea ya completada' });
            return;
        }
        const updatedTask = yield (0, tasksService_1.updateTaskService)(id);
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
});
exports.updateTaskController = updateTaskController;

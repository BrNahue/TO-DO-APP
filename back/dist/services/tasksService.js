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
exports.updateTaskService = exports.deleteTaskService = exports.getTasksService = exports.addTaskService = void 0;
const data_source_1 = require("../config/data-source");
const addTaskService = (task) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOneBy({ id: task.userId });
    if (!user) {
        throw new Error("User not found");
    }
    // Asocia el usuario a la tarea
    const newTask = data_source_1.TaskModel.create({
        title: task.title,
        description: task.description,
        completed: task.completed,
        user: user // <-- Aquí se asocia el usuario
    });
    const result = yield data_source_1.TaskModel.save(newTask);
    return result;
});
exports.addTaskService = addTaskService;
const getTasksService = (Id) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield data_source_1.TaskModel.find({
        where: {
            user: {
                id: Id
            }
        }
    });
    return tasks;
});
exports.getTasksService = getTasksService;
const deleteTaskService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield data_source_1.TaskModel.findOneBy({ id });
    if (!task) {
        throw new Error("Task not found");
    }
    yield data_source_1.TaskModel.remove(task);
});
exports.deleteTaskService = deleteTaskService;
const updateTaskService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield data_source_1.TaskModel.findOneBy({ id });
    if (!task) {
        throw new Error("Task not found");
    }
    task.completed = true;
    yield data_source_1.TaskModel.save(task);
});
exports.updateTaskService = updateTaskService;

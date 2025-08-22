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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersController = exports.loginUserController = exports.registerUserController = void 0;
const usersService_1 = require("../services/usersService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Campos incompletos' });
            return;
        }
        else {
            const newUser = yield (0, usersService_1.registerUserService)({ username, password });
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        }
    }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Campos incompletos' });
            return;
        }
        else {
            const user = yield (0, usersService_1.loginUserService)({ username, password });
            const payload = { id: user.id, username: user.username };
            const secret = process.env.JWT_SECRET || 'secreto';
            const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
            console.log(token);
            res.status(200).json({ token, user });
        }
    }
    catch (error) {
        console.error('Error al iniciar sesión:', error);
        if (error.message === 'Usuario no encontrado' ||
            error.message === 'Contraseña incorrecta') {
            res.status(401).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
});
exports.loginUserController = loginUserController;
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersService_1.getUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getUsersController = getUsersController;

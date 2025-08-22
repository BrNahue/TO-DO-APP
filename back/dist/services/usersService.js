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
exports.loginUserService = exports.getUsersService = exports.registerUserService = void 0;
const data_source_1 = require("../config/data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = userData;
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    userData.password = hashedPassword;
    const newUser = yield data_source_1.UserModel.create(userData);
    const result = yield data_source_1.UserModel.save(newUser);
    return result;
});
exports.registerUserService = registerUserService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.UserModel.find({ relations: ['tasks'] });
    return users;
});
exports.getUsersService = getUsersService;
const loginUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = userData;
    const user = yield data_source_1.UserModel.findOneBy({
        username: username
    });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    else {
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }
        else {
            return { id: user.id, username: user.username };
        }
    }
});
exports.loginUserService = loginUserService;

import { Request, Response } from 'express';
import { User } from '../entities/User';
import { registerUserService, getUsersService,loginUserService } from '../services/usersService';
import jwt from 'jsonwebtoken';

export const registerUserController = async (req:Request, res:Response):Promise<void> => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Campos incompletos' });
            return;
        }else {
            const newUser:User = await registerUserService({username, password});
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Campos incompletos' });
            return;
        } else {
            const user = await loginUserService({ username, password });
            const payload = { id: user.id, username: user.username };
            const secret = process.env.JWT_SECRET || 'secreto';
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
            res.status(200).json( {token,user} );
        }
    } catch (error: any) {
        console.error('Error al iniciar sesión:', error);
        if (
            error.message === 'Usuario no encontrado' ||
            error.message === 'Contraseña incorrecta'
        ) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export const getUsersController = async (req:Request, res:Response):Promise<void> => {
// // //     try {
// // //         const users:User[] = await getUsersService();
// // //         res.status(200).json(users);
// // //     } catch (error) {
// // //         console.error('Error al obtener usuarios:', error);
// // //         res.status(500).json({ message: 'Error interno del servidor' });
// // //     }
}
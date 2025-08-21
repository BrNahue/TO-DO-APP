import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../config/data-source';

export const verifyUser = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const {username, password} = req.body
        const user = await UserModel.findOneBy({
            username:username
        })
        if (user) {
            res.status(400).json("Usuario Ya registrado.")
        }else{
            next()
        }
    }catch(error:any){
        res.status(400).json(error.message)
    }
}
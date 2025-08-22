import { userdata } from '../dto/userdataDto';
import { User } from '../entities/User';
import { UserModel } from '../config/data-source';
import bcrypt from 'bcrypt';

export const registerUserService = async (userData:userdata):Promise<User> => {
    const { username, password } = userData;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    userData.password = hashedPassword;

    const newUser:User = await UserModel.create(userData)
    const result:User = await UserModel.save(newUser)
    return result
}

export const getUsersService = async ():Promise<User[]> => {
    const users:User[] = await UserModel.find({relations: ['tasks']});
    return users;
}

export const loginUserService = async (userData:userdata) => {
    const { username, password } = userData;

    const user = await UserModel.findOneBy({
        username: username
    })
    if (!user) {
        throw new Error('Usuario no encontrado');
    }else{
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        } else {
            return {id: user.id, username: user.username};
        }
    }
}
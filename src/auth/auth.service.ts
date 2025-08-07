import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Console } from 'console';
@Injectable()
export class AuthService {
    constructor(private readonly prismaService:PrismaService) {}

    async register(userName:string, password:string): Promise<Boolean>{
        const user = await this.prismaService.user.findUnique({
            where:{
                userName,
            }
        })
        if(user){
            throw new ConflictException('Пользователь с таким именем уже существует');
        }
        await this.prismaService.user.create({
            data: {
                userName,
                password,
            },
        });
        console.log('Пользователь успешно зарегистрирован:', userName);
        return true; // Успешная регистрация
    }

    async login(userName:string, password:string): Promise<Boolean>{
        const user = await this.prismaService.user.findUnique({
            where:{
                userName,
            }
        })
        if(!user || user.password !== password){
            throw new ConflictException('Неверное имя пользователя или пароль');
            return false; // Неверные учетные данные
        }
        console.log('Пользователь успешно вошел в систему:', userName);
        return true; // Успешный вход
    }
}

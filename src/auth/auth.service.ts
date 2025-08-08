import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
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
        const hashed = await bcrypt.hash(password, 10);
        await this.prismaService.user.create({
            data: {
                userName,
                password: hashed,
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
        if(!user || !bcrypt.compare(password, user.password)){
            throw new ConflictException('Неверное имя пользователя или пароль');
            
        }
        console.log('Пользователь успешно вошел в систему:', userName);
        return true; // Успешный вход
    }
}

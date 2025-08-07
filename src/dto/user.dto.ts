import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class UserDto{

    @IsNotEmpty({
        message: 'Имя пользователя не может быть пустым'
    })
    @IsString({
        message: 'Имя пользователя должно быть строкой'
    })
    @MinLength(3,{
        message: 'Длина имени пользователя должна быть от 3 до 20 символов'
    })
    @MaxLength(20, {
        message: 'Длина имени пользователя должна быть от 3 до 20 символов'
    })

    userName: string;

    @IsNotEmpty({
        message: 'Пароль не может быть пустым'
    })
    @IsString({
        message: 'Пароль должен быть строкой'
    })
    @MinLength(6, {
        message: 'Длина пароля должна быть от 6 до 20 символов'
    })
    @MaxLength(20, {
        message: 'Длина пароля должна быть от 6 до 20 символов'
    })
    password: string;
}
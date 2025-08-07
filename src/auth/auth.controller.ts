import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: UserDto) {
    const { userName, password } = userDto;
    return this.authService.register(userName, password);
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    const { userName, password } = userDto;
    return this.authService.login(userName, password);
  }
}

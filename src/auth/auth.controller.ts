import { Controller, Get, Req, UseGuards,Post, Body, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from 'src/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly jwtService: JwtService
  ) {}

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

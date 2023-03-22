import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from './user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  signin(@User() user) {
    return this.authService.signin(user);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@User() user) {
    return this.authService.getMe(user.id);
  }
}

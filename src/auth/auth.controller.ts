import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      // จัดการข้อผิดพลาดของกระบวนการล็อกอิน
      throw new HttpException(
        error.message || 'Login failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      // จัดการข้อผิดพลาดของกระบวนการลงทะเบียน
      throw new HttpException(
        error.message || 'Registration failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  @Post('refresh')
  async refresh(
    @Body('refresh_token') refreshToken: string,
  ): Promise<{ access_token: string }> {
    try {
      return await this.authService.refreshAccessToken(refreshToken);
    } catch (error) {
      // Handle the error appropriately
      throw new HttpException(
        error.message || 'Refresh token failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

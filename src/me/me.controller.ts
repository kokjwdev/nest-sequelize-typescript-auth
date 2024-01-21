import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MeService } from './me.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtLocalDto } from 'src/auth/dto/jwt-local.dto';

@UseGuards(JwtAuthGuard) // ใช้ LocalAuthGuard ก่อน RolesGuard
@Controller('me')
export class MeController {
  constructor(private meService: MeService) {}

  @Get()
  async getMe(@GetUser() user: JwtLocalDto) {
    try {
      return this.meService.getMe(user.userId);
    } catch (error) {
      // จัดการข้อผิดพลาดของกระบวนการล็อกอิน
      throw new HttpException(
        error.message || 'Login failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

// src/admin/admin.controller.ts

import {
  Controller,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { AdminService } from './admin.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtLocalDto } from 'src/auth/dto/jwt-local.dto';

@UseGuards(JwtAuthGuard, RolesGuard) // ใช้ LocalAuthGuard ก่อน RolesGuard
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('users')
  async getAllUsers(@GetUser() user: JwtLocalDto) {
    try {
      return this.adminService.getAllUsers();
    } catch (error) {
      // จัดการข้อผิดพลาดของกระบวนการล็อกอิน
      throw new HttpException(
        error.message || 'Login failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

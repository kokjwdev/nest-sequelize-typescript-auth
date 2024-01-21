import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      // จัดการข้อผิดพลาดที่นี่
      throw new HttpException(
        error.message || 'Error creating user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ตัวอย่าง: เพิ่ม endpoints อื่นๆ ตามความจำเป็น
}

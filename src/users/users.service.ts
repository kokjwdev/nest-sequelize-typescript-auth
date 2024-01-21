import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async findByPk(id: number): Promise<User | undefined> {
    return this.userModel.findByPk(id);
  }

  // เพิ่มฟังก์ชันสำหรับสร้างผู้ใช้ใหม่
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = {
        ...createUserDto,
        password: hashedPassword,
      };
      return this.userModel.create(newUser);
    } catch (error) {
      // จัดการกับข้อผิดพลาดที่อาจเกิดขึ้น
      throw new HttpException(
        error.message || 'Unable to create user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

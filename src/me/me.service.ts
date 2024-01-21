// me.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { MeDto } from './dto/me.dto';

@Injectable()
export class MeService {
  constructor(private usersService: UsersService) {}

  async getMe(userId: number): Promise<Omit<MeDto, 'password'> | null> {
    try {
      const user = await this.usersService.findByPk(userId);
      if (user) {
        const { password, ...result } = user.get({
          plain: true,
        }) as MeDto & { password: string };
        return result;
      }
      return null;
    } catch (error) {
      // จัดการกับข้อผิดพลาดที่อาจเกิดขึ้น
      throw new HttpException(
        error.message || 'Unable to retrieve user data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

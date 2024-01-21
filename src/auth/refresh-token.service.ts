// src/auth/refresh-token.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshToken } from './refresh-token.model';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshToken)
    private refreshTokenModel: typeof RefreshToken,
  ) {}

  async createRefreshToken(
    userId: number,
    token: string,
  ): Promise<RefreshToken> {
    return this.refreshTokenModel.create({ userId, token });
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    return this.refreshTokenModel.findOne({ where: { token } });
  }

  // บันทึกหรืออัปเดต refresh token ในฐานข้อมูล
  async saveRefreshToken(
    userId: number,
    token: string,
    expiresIn: number,
  ): Promise<RefreshToken> {
    try {
      const expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + expiresIn);

      // ตรวจสอบว่ามี token สำหรับ user นี้อยู่แล้วในฐานข้อมูลหรือไม่
      const existingToken = await this.refreshTokenModel.findOne({
        where: { userId },
      });

      if (existingToken) {
        // อัปเดต token ที่มีอยู่
        existingToken.token = token;
        existingToken.expiryDate = expiryDate;
        return existingToken.save();
      } else {
        // สร้าง token ใหม่
        return this.refreshTokenModel.create({
          userId,
          token,
          expiryDate,
        });
      }
    } catch (error) {
       throw new HttpException(
         error.message || 'Registration failed',
         HttpStatus.BAD_REQUEST,
       );
    }
  }

  // เพิ่มเมธอดอื่น ๆ ตามความจำเป็น
}

// auth.service.ts;
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenService } from './refresh-token.service';
import { convertTimeToMilliseconds } from 'src/common/utility/convert-time-to-milliseconds';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(email);
      if (user && (await bcrypt.compare(pass, user.password))) {
        const { password, ...result } = user.get({ plain: true });
        return result;
      }
      return null;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error validating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const payload = { email: user.email, sub: user.id, role: user.role };
      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRE'),
      });

      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRATION_TIME',
        ),
      });

      await this.refreshTokenService.saveRefreshToken(
        user.id,
        refreshToken,
        convertTimeToMilliseconds(
          this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
        ),
      );

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Login failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    try {
      // ตรวจสอบ refresh token
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      }) as JwtPayloadDto;

      // ตรวจสอบว่า token มีอยู่ในฐานข้อมูลและยังไม่หมดอายุ
      const storedToken =
        await this.refreshTokenService.findRefreshToken(refreshToken);
      if (
        !storedToken ||
        storedToken.expiryDate.getTime() < new Date().getTime()
      ) {
        throw new HttpException(
          'Invalid refresh token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      // สร้าง access token ใหม่
      const user = await this.usersService.findOne(decoded.email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const payload = { userId: user.id, email: user.email, role: user.role };
      const newAccessToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRE'),
      });

      return { access_token: newAccessToken };
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  async validateEmailDuplicate(email: string): Promise<void> {
    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      await this.validateEmailDuplicate(registerDto.email); // ตรวจสอบว่าอีเมลซ้ำหรือไม่
      const newUser = await this.usersService.create(registerDto);
      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Registration failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

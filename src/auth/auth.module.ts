// auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from './refresh-token.model';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE') },
        };
      },
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([RefreshToken]),
    UsersModule, // เพิ่มการ import UsersModule นี้
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenService],
  controllers: [AuthController],
})
export class AuthModule {}

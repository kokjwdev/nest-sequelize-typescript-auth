// src/me/me.module.ts

import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { MeService } from './me.service';
import { MeController } from './me.controller';

@Module({
  imports: [UsersModule],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}

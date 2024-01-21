// me.dto.ts

import { IsString, IsEmail, IsDate, IsInt, IsPositive } from 'class-validator';

export class MeDto {
  @IsInt()
  @IsPositive()
  readonly id: number;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly role: string;

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly updatedAt: Date;
}

import { IsString, IsEmail, IsInt, IsPositive } from 'class-validator';

export class JwtPayloadDto {
  @IsEmail()
  readonly email: string;

  @IsInt()
  @IsPositive()
  readonly sub: number;

  @IsString()
  readonly role: string;
}

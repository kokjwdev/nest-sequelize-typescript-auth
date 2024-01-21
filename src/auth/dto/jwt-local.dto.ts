import { IsString, IsEmail, IsInt, IsPositive } from 'class-validator';

export class JwtLocalDto {
  @IsInt()
  @IsPositive()
  readonly userId: number;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly role: string;
}

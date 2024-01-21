import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  // คุณสามารถเพิ่ม fields อื่นๆ ได้ตามความจำเป็น
}

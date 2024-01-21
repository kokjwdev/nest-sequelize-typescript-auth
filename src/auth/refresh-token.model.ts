// src/auth/models/refresh-token.model.ts

import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from 'src/users/user.model';

@Table
export class RefreshToken extends Model<RefreshToken> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  token: string;

  @Column(DataType.DATE)
  expiryDate: Date;

  // เพิ่มคอลัมน์อื่น ๆ ตามความจำเป็น, เช่น expiryDate หรือ isRevoked
}

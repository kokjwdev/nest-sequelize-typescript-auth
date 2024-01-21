// src/admin/admin.service.ts

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
  constructor(private usersService: UsersService) {}

  async getAllUsers() {
    return this.usersService.findAll();
  }
}

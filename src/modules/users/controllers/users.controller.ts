import { Controller, Get } from '@nestjs/common';

import { ROUTES } from '../../../models/routes.model';
import { Auth } from '../../../modules/auth/decorators/auth.decorator';
import { UsersService } from '../services/users.service';
import { UserEntity } from '../user.entity';

@Controller(ROUTES.USERS)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Auth()
  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }
}

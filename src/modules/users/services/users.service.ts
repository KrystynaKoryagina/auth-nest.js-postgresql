import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ERROR_CODE } from '../../../constants/errors.constant';
import { CreateUser } from '../models/user.model';
import { UserEntity } from '../user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<Omit<UserEntity[], 'password'>> {
    return this.usersRepository.find();
  }

  async createUser(createUserData: CreateUser): Promise<UserEntity> {
    const user = await this.getUserByEmail(createUserData.email);

    if (user) {
      throw new ConflictException(ERROR_CODE.USER_EXIST);
    }

    const newUser = this.usersRepository.create(createUserData);

    return await this.usersRepository.save(newUser);
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'firstName', 'lastName', 'password', 'createdAt'],
    });
  }
}

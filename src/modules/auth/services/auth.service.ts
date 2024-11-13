import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { Response, Request } from 'express';

import { JwtTokensService } from './jwt-tokens.service';
import { ERROR_CODE } from '../../../constants/errors.constant';
import { UsersService } from '../../../modules/users/services/users.service';
import { UserEntity } from '../../../modules/users/user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthTokens } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtTokensService: JwtTokensService,
  ) {}

  async register(
    dto: RegisterDto,
    res: Response,
  ): Promise<Omit<AuthTokens, 'refreshToken'>> {
    const newUser = await this.usersService.createUser({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: await this.hashPassword(dto.password),
    });

    return this.jwtTokensService.issueTokens(newUser, res);
  }

  async login(
    dto: LoginDto,
    res: Response,
  ): Promise<Omit<AuthTokens, 'refreshToken'>> {
    const user = await this.validateUser(dto.email, dto.password);

    return this.jwtTokensService.issueTokens(user, res);
  }

  async regenerateTokens(
    req: Request,
    res: Response,
  ): Promise<Omit<AuthTokens, 'refreshToken'>> {
    const refreshToken: string =
      this.jwtTokensService.getRefreshTokenFromCookie(req, res);

    const { email } = await this.jwtTokensService.verifyToken(refreshToken);

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(ERROR_CODE.USER_NOT_FOUND);
    }

    return this.jwtTokensService.issueTokens(user, res);
  }

  async logout(res: Response): Promise<void> {
    return this.jwtTokensService.removeRefreshTokenFromCookie(res);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();

    return hash(password, salt);
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(ERROR_CODE.USER_NOT_FOUND);
    }

    const isPassEquals = await compare(password, user.password);

    if (!isPassEquals) {
      throw new UnauthorizedException(ERROR_CODE.PASSWORD_INVALID);
    }

    return user;
  }
}

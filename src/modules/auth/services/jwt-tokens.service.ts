import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

import { ERROR_CODE } from '../../../constants/errors.constant';
import { UserEntity } from '../../../modules/users/user.entity';
import { AuthTokens, TokenPayload } from '../models/token.model';

@Injectable()
export class JwtTokensService {
  private readonly ACCESS_TOKEN_EXPIRATION = '1h';
  private readonly REFRESH_TOKEN_EXPIRATION = '15d';
  private readonly REFRESH_TOKEN_EXPIRE_DAY = 1;

  readonly REFRESH_TOKEN_NAME = 'refreshToken';

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async verifyToken(token: string): Promise<TokenPayload> {
    const payload: TokenPayload = await this.jwtService.verifyAsync(token);

    if (!payload) {
      throw new UnauthorizedException(ERROR_CODE.TOKEN_INVALID);
    }

    return payload;
  }

  async issueTokens(
    user: UserEntity,
    res: Response,
  ): Promise<Omit<AuthTokens, 'refreshToken'>> {
    const { refreshToken, accessToken } = await this.generateTokens(user);

    this.addRefreshTokenToCookie(res, refreshToken);

    return { accessToken };
  }

  private async generateTokens(user: UserEntity): Promise<AuthTokens> {
    const payload: TokenPayload = { sub: user.id, email: user.email };

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.REFRESH_TOKEN_EXPIRATION,
    });

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.ACCESS_TOKEN_EXPIRATION,
    });

    return { refreshToken, accessToken };
  }

  private addRefreshTokenToCookie(res: Response, refreshToken: string): void {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.REFRESH_TOKEN_EXPIRE_DAY);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('HOST'),
      expires: expiresIn,
      secure: true,
      sameSite: 'lax',
    });
  }

  getRefreshTokenFromCookie(req: Request, res: Response): string {
    const refreshToken: string | undefined =
      req.cookies[this.REFRESH_TOKEN_NAME];

    if (!refreshToken) {
      this.removeRefreshTokenFromCookie(res);

      throw new UnauthorizedException(ERROR_CODE.REFRESH_TOKEN_DO_NOT_EXIST);
    }

    return refreshToken;
  }

  removeRefreshTokenFromCookie(res: Response): void {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: this.configService.get('HOST'),
      expires: new Date(0),
      secure: true,
      sameSite: 'lax',
    });
  }
}

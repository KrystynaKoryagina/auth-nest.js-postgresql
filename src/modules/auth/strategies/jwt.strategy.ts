import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../../modules/users/services/users.service';
import { UserEntity } from '../../../modules/users/user.entity';
import { TokenPayload } from '../models/token.model';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: TokenPayload): Promise<UserEntity | null> {
    return this.userService.getUserByEmail(payload.email);
  }
}

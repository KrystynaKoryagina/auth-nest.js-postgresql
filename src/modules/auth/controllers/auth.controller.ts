import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { ROUTES } from '../../../models/routes.model';
import { Auth } from '../decorators/auth.decorator';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthTokens } from '../models/token.model';
import { AuthService } from '../services/auth.service';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(ROUTES.REGISTER)
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Omit<AuthTokens, 'refreshToken'>> {
    return this.authService.register(dto, res);
  }

  @Post(ROUTES.LOGIN)
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Omit<AuthTokens, 'refreshToken'>> {
    return this.authService.login(dto, res);
  }

  @Auth()
  @HttpCode(200)
  @Post(ROUTES.GENERATE_TOKENS)
  async generateTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Omit<AuthTokens, 'refreshToken'>> {
    return this.authService.regenerateTokens(req, res);
  }

  @Post(ROUTES.LOGOUT)
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    return this.authService.logout(res);
  }
}

import { applyDecorators, UseGuards } from '@nestjs/common';

import { JWTAuthGuard } from '../guard/jwt.guard';

export function Auth() {
  return applyDecorators(UseGuards(JWTAuthGuard));
}

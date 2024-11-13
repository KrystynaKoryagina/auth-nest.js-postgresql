import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ERROR_CODE } from '../../../constants/errors.constant';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_PATTERN,
} from '../../../constants/pattern.constant';

export class LoginDto {
  @IsNotEmpty({ message: ERROR_CODE.EMAIL_REQUIRED })
  @IsEmail({}, { message: ERROR_CODE.EMAIL_INVALID })
  email: string;

  @MinLength(MIN_PASSWORD_LENGTH, {
    message: ERROR_CODE.PASSWORD_MIN_LENGTH,
  })
  @MaxLength(MAX_PASSWORD_LENGTH, {
    message: ERROR_CODE.PASSWORD_MAX_LENGTH,
  })
  @Matches(PASSWORD_PATTERN, {
    message: ERROR_CODE.PASSWORD_INVALID,
  })
  @IsString({
    message: ERROR_CODE.PASSWORD_REQUIRED,
  })
  password: string;
}

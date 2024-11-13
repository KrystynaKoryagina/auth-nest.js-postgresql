import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

import { ERROR_CODE } from '../../../constants/errors.constant';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_PATTERN,
} from '../../../constants/pattern.constant';
import { Match } from '../../../decorators/match.decorator';

export class RegisterDto {
  @IsNotEmpty({ message: ERROR_CODE.EMAIL_REQUIRED })
  @IsEmail({}, { message: ERROR_CODE.EMAIL_INVALID })
  email: string;

  @IsNotEmpty({ message: ERROR_CODE.FIRST_NAME_REQUIRED })
  @IsString({ message: ERROR_CODE.FIRST_NAME_INVALID })
  firstName: string;

  @IsNotEmpty({ message: ERROR_CODE.LAST_NAME_REQUIRED })
  @IsString({ message: ERROR_CODE.LAST_NAME_INVALID })
  lastName: string;

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

  @Match('password', {
    message: ERROR_CODE.CONFIRM_PASSWORD_INVALID,
  })
  @IsString({
    message: ERROR_CODE.CONFIRM_PASSWORD_REQUIRED,
  })
  confirmPassword: string;
}

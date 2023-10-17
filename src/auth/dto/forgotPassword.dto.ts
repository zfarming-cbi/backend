import { IsEmail, IsString } from 'class-validator';

export class ForgotPasswordDTO {
  @IsEmail()
  email: string;
}

export class RecoverPasswordDTO {
  @IsString()
  password: string;
}

export class ChangePasswordDTO {
  @IsString()
  currentPassword: string;
  @IsString()
  newPassword: string;
}

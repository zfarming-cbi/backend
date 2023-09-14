import { IsEmail, IsString } from 'class-validator';

export class ForgotPasswordDTO {
  @IsEmail()
  email: string;
}

export class RecoverPasswordDTO {
  @IsString()
  password: string;
}

import { IsEmail } from 'class-validator';

export class ForgotPasswordDTO {
  @IsEmail()
  username: string;
}

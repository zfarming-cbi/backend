import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupDTO {
  @IsEmail()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  company: string;
}

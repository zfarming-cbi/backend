import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Redirect,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/isPublic';
import {
  ForgotPasswordDTO,
  LoginDTO,
  RecoverPasswordDTO,
  SignupDTO,
} from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolService } from 'src/rol/rol.service';
import { UsersService } from 'src/user/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private rolService: RolService,
    private userService: UsersService,
  ) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() signupDto: SignupDTO) {
    return this.authService.signup(signupDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Public()
  @Get('recover-password-screen/:uuid')
  @Redirect()
  @HttpCode(HttpStatus.OK)
  recoverPasswordScreen(@Param('uuid') uuid: string) {
    return this.authService.recoverPasswordScreen(uuid);
  }

  @Public()
  @Patch('recover-password/:uuid')
  @Redirect()
  @HttpCode(HttpStatus.OK)
  recoverPassword(
    @Param('uuid') uuid: string,
    @Body() recoverPasswordDto: RecoverPasswordDTO,
  ) {
    return this.authService.recoverPassword(uuid, recoverPasswordDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req: any) {
    const user = await this.userService.findAll(1);
    console.log('**** Aqui esta el user', user);
    // const rol = await this.rolService.findAll();
    // console.log(rol);
    return req.user;
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
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
import { UsersService } from 'src/user/users.service';
import { Roles } from './decorators/roles';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
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
  @HttpCode(HttpStatus.OK)
  recoverPasswordScreen(@Param('uuid') uuid: string) {
    return this.authService.recoverPasswordScreen(uuid);
  }

  @Public()
  @Patch('recover-password/:uuid')
  @HttpCode(HttpStatus.OK)
  recoverPassword(
    @Param('uuid') uuid: string,
    @Body() recoverPasswordDto: RecoverPasswordDTO,
  ) {
    return this.authService.recoverPassword(uuid, recoverPasswordDto);
  }

  @ApiBearerAuth()
  @Roles('ADMIN')
  @Get('profile')
  async getProfile(@Request() req: any) {
    // const user = await this.userService.findAll(
    //   {
    //     page: '1',
    //     perPage: '10',
    //     search: '',
    //   },
    //   1,
    // );
    // console.log('**** Aqui esta el user', user);
    return req.user;
  }
}

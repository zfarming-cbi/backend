import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from 'src/company/company.service';
import { User } from 'src/database/entities';
import { GroupService } from 'src/group/group.service';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/user/users.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private companyService: CompanyService,
    private jwtService: JwtService,
    private mailService: MailService,
    private configService: ConfigService,
    private groupService: GroupService,
  ) {}

  async signup(args: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    company: string;
    nit: string;
  }): Promise<any> {
    const company = await this.companyService.findOne(args.nit);
    if (company) throw new UnauthorizedException('El nit ya esta en uso');
    const new_company = await this.companyService.create(
      args.company,
      args.nit,
    );
    const user = await this.usersService.create({
      firstname: args.firstname,
      lastname: args.lastname,
      email: args.email,
      password: args.password,
      companyId: new_company.id,
    });
    const payload = {
      sub: user.id,
      email: user.email,
      companyId: user.companyId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new UnauthorizedException();

    if (await this.validatePassword(pass, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      email: user.email,
      companyId: user.companyId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async validatePassword(
    password: string,
    passwordSaved: string,
  ): Promise<boolean> {
    return this.usersService.comparePassword(password, passwordSaved);
  }

  async forgotPassword(email: string): Promise<object> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new UnauthorizedException();
    const uuid = uuidv4();
    const url = `http://localhost:5173/recover-password/${uuid}`;
    // const url = `${this.configService.get(
    //   'urls.link_recover_password',
    // )}/${uuid}`;
    await this.mailService.sendMail(user, url, 'Restablece la contraseña');
    await this.usersService.update(user.id, { uuid_forgot: uuid });
    return { message: 'Se ha enviado un enlace para recuperar la contraseña' };
  }

  async recoverPassword(
    uuid: string,
    recoverPassword: {
      password: string;
    },
  ): Promise<object> {
    const user = await this.usersService.findOne(uuid);
    if (!user) throw new UnauthorizedException('El enlace ya expiro');
    await this.usersService.update(user.id, {
      uuid_forgot: '',
      password: recoverPassword.password,
    });
    const payload = {
      sub: user.id,
      email: user.email,
      companyId: user.companyId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async recoverPasswordScreen(uuid: string): Promise<User> {
    const user = await this.usersService.findOne(uuid);
    console.log('llego hasta la busqueda del usuario', user);
    if (!user) throw new UnauthorizedException('El enlace ya expiro');
    return user;
  }
}

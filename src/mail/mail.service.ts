import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: User, url: string, subject: string) {
    await this.mailerService.sendMail({
      to: user.username,
      from: '"Support Team" <support@example.com>',
      subject: subject,
      template: 'forgotPassword',
      context: {
        name: user.firstname,
        url,
      },
    });
  }
}

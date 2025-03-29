import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({})
export class MailerModule {
  providers: [EmailService];
  exports: [EmailService];
}

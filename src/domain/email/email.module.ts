import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class MailerModule {
  imports: [ConfigModule];
  providers: [EmailService];
  exports: [EmailService];
}

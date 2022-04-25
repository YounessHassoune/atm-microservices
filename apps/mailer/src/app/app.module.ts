import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailModule } from '../mailer/mailer.module';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@atm-microservices/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'Gmail',
          secure: false,
          auth: {
            user: configService.get('MAILER_EMAIL') ,
            pass: configService.get('MAILER_PASSWORD') ,
          },
        },
        defaults: {
          from: `"CIH" <${configService.get("MAILER_EMAIL")}>`,
        },
        template: {
          dir: join(__dirname, 'assets/templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },

      }),
      inject: [ConfigService],
    }),
    MailModule,
  ],
})
export class AppModule { }
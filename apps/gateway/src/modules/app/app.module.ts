import { Module } from '@nestjs/common';
import {ConfigModule} from '@atm-microservices/config';
import { UserModule } from '../user/user.module';
@Module({
  imports: [ConfigModule,UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

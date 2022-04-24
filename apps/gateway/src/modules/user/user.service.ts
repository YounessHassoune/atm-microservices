import { GetUser, TOPICS, User, Withdrawal } from '@atm-microservices/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
    constructor(@Inject('USER-SERVICE') private readonly userService: ClientKafka) { }
    
    async getUser(getUser:GetUser): Promise<User> {
        return await firstValueFrom(this.userService.send(
           TOPICS.USER_TOPICS.GET_USER,
           JSON.stringify(getUser)),
        );
    }

    async  withdrawal(withdrawal:Withdrawal): Promise<User> {
        return await firstValueFrom(this.userService.send(
              TOPICS.USER_TOPICS.USER_WITHDRAWAL,
              JSON.stringify(withdrawal)),
        );
    }
}

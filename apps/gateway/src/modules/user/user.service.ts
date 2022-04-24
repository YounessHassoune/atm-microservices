import { GetUser, TOPICS } from '@atm-microservices/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserService {
    constructor(@Inject('USER-SERVICE') private readonly userService: ClientKafka) { }
    
    async getUser(getUser:GetUser): Promise<any> {
        return await this.userService.send(
           TOPICS.USER_TOPICS.GET_USER,
           JSON.stringify(getUser),
        );
    }
}

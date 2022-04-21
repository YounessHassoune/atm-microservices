import { TOPICS } from '@atm-microservices/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserService {
    constructor(@Inject('USER-SERVICE') private readonly userService: ClientKafka) { }
    
    async getUser(userId:string): Promise<any> {
        return  await this.userService.send(
           TOPICS.USER_TOPICS.GET_USER,
           JSON.stringify(userId),
        );
    }
}

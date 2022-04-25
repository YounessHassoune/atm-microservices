import { GetUser, ParseMessagePipe, TOPICS, User, Withdrawal } from '@atm-microservices/common';
import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';



@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    ) { }

  
  @MessagePattern(TOPICS.USER_TOPICS.GET_USER)
  async getUser(@Payload(new ParseMessagePipe()) data: GetUser): Promise<User> {
    return this.userService.getUser(data);
  }

  @MessagePattern(TOPICS.USER_TOPICS.USER_WITHDRAWAL)
  async withdrawal(@Payload(new ParseMessagePipe()) data: Withdrawal): Promise<User> {
    return this.userService.withdrawal(data);
  }
}

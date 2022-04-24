import { GetUser, ParseMessagePipe, TOPICS, User } from '@atm-microservices/common';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';



@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }


  @MessagePattern(TOPICS.USER_TOPICS.GET_USER)
  async getUser(@Payload(new ParseMessagePipe()) data: GetUser): Promise<User> {
    return this.userService.getUser(data);
  }
}

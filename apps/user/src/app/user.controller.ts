import { TOPICS } from '@atm-microservices/common';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';



@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }


  @MessagePattern(TOPICS.USER_TOPICS.GET_USER)
  async getUser(@Payload() data: any): Promise<any> {
    console.log(data.value);
    const userId = data.value;
    Logger.log('user ud form user service : ' + userId);
    return this.userService.getUser();

  }
}

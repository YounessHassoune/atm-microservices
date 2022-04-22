import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser(userId) {
    return { message:    `this us user number ${userId}` };
  }
}

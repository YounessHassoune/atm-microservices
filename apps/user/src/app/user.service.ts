import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser() {
    return { message: 'Welcome to user!' };
  }
}

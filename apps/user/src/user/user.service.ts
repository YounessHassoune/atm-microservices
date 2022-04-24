import { GetUser, User, UserDocument, Withdrawal } from '@atm-microservices/common';
import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name)
  private userModel: Model<UserDocument>) { }


  async getUser(getUser: GetUser): Promise<User> {
    const { account_number, account_pin } = getUser;
    const user = await this.userModel.findOne({
      account_number,
    });
    if (!user) throw new RpcException('Incorrect account number or pin');
    return user
  }

  async withdrawal(withdrawal: Withdrawal): Promise<User> {
      const {_id, amount } = withdrawal;
      const user = await this.userModel.findOne({ _id:_id });
      Logger.log(withdrawal);
      if(!user) throw new RpcException('User not found');
      if(user.account_balance < amount) throw new RpcException('Insufficient balance');
      user.account_balance -= amount;
      await user.save();
      return user;
  }
}

import { GetUser, TOPICS, User, UserDocument, Withdrawal } from '@atm-microservices/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name)
  private userModel: Model<UserDocument>,
    @Inject('MAIL-SERVICE') private readonly mailClient: ClientKafka,
  ) { }


  async getUser(getUser: GetUser): Promise<User> {
    const { account_number, account_pin } = getUser;
    const user = await this.userModel.findOne({
      account_number,
    });
    if (!user) throw new RpcException('Incorrect account number or pin');
    return user
  }

  async withdrawal(withdrawal: Withdrawal): Promise<User> {
    const { account_number, amount } = withdrawal;
    const user = await this.userModel.findOne({ account_number });
    Logger.log(withdrawal);
    if (!user) throw new RpcException('User not found');
    if (user.account_balance < amount) throw new RpcException('Insufficient balance');
    user.account_balance -= amount;
    await user.save();
    const data = {
      template: 'withdrawal',
      to: user.user_email,
      subject: 'Account Withdrawal',
      context: {
        user: user.user_fullName,
        account_number,
        amount,
      }
    };
    this.mailClient.emit(TOPICS.MAIL_TOPICS.SEND_MAIL, JSON.stringify(data));
    return user;
  }
}

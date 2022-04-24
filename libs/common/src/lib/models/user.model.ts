import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class User {

    @Prop({ required: true })
    user_fullName: string;

    @Prop({ required: true })
    user_email: string;

    @Prop({ required: true })
    user_phone: number;

    @Prop({ required: true })
    account_number: number;

    @Prop({ required: true })
    account_pin: number;

    @Prop({ required: true })
    account_balance: number;


}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
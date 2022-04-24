import {IsMongoId, IsNumber, IsPositive } from "class-validator";

export class Withdrawal {
    @IsMongoId()
    _id: string

    @IsNumber()
    @IsPositive()
    amount: number
}
import {IsIn, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class Recharge {
    @IsNumber()
    @Min(1000000000000000)
    @Max(9999999999999999)
    account_number: number

    @IsNumber()
    @IsIn([5, 10, 20,30, 50, 100, 200, 500])
    amount: number

    @IsString()
    @IsNotEmpty()
    company: string

    @IsString()
    @IsNotEmpty()
    type: string

    @IsString()
    @IsNotEmpty()
    phone: string

}
import {IsNumber, Max, Min } from "class-validator";

export class GetUser {
    @IsNumber()
    @Min(1000000000000000)
    @Max(9999999999999999)
    account_number: number

    @IsNumber()
    @Min(1000)
    @Max(9999)
    account_pin: number
}
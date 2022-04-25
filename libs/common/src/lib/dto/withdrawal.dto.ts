import { IsNumber, IsPositive, Max, Min } from "class-validator";

export class Withdrawal {
    @IsNumber()
    @Min(1000000000000000)
    @Max(9999999999999999)
    account_number: string

    @IsNumber()
    @IsPositive()
    amount: number
}
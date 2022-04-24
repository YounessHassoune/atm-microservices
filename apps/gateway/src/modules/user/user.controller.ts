import {  GetUser, TOPICS, Withdrawal } from "@atm-microservices/common";
import { Body, Controller, Get, Inject, Logger, Param, Post } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { UserService } from "./user.service";


@Controller('user')
export class UserController {
    constructor(
        @Inject('USER-SERVICE') private readonly userClient: ClientKafka,
        private readonly userService: UserService) { }
    
    onModuleInit() {
        //  The subscribeToResponseOf() method takes a request's topic name as an argument
        //  and adds the derived reply topic name to a collection of reply topics.
        //  This method is required when implementing the message pattern.
        for (const topic in TOPICS.USER_TOPICS) {
            this.userClient.subscribeToResponseOf(TOPICS.USER_TOPICS[topic]);
        }
    }

    @Post()
    async getUser(@Body() getUser:GetUser) {
       return await this.userService.getUser(getUser);
    }

    @Post('withdrawal')
    async withdrawal(@Body() withdrawal:Withdrawal) {
        return await this.userService.withdrawal(withdrawal);
    }

}
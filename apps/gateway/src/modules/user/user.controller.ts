import { TOPICS } from "@atm-microservices/common";
import { Controller, Get, Inject, Logger, Param } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { UserService } from "./user.service";


@Controller('user')
export class UserController {
    constructor(
        @Inject('USER-SERVICE') private readonly userClient: ClientKafka,
        private readonly userService: UserService) { }
    onModuleInit() {
        for (const topic in TOPICS.USER_TOPICS) {
             this.userClient.subscribeToResponseOf(TOPICS.USER_TOPICS[topic]);
        }
    }

    @ApiBody({ type: String })
    @Get(':id')
    async getUser(@Param() params) {
        const userId = params.id;
        Logger.log(userId);
        return this.userService.getUser(userId);
    }
}
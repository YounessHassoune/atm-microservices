import { CONSUMER_GROUPS } from "@atm-microservices/common";
import { ConfigService } from "@atm-microservices/config";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'USER-SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'user-service',
                        brokers: [new ConfigService().get('KAFKA_BROKER_HOST')],
                    },
                    consumer: {
                        groupId: CONSUMER_GROUPS.USER_GROUP,
                        allowAutoTopicCreation: true,
                    },
                },
            },
        ])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }
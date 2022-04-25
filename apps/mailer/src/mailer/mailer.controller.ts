
import { Mail, ParseMessagePipe, TOPICS, Withdrawal } from "@atm-microservices/common";
import { Controller, Logger } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { MailService } from "./mailer.service";

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) { }


 @EventPattern(TOPICS.MAIL_TOPICS.SEND_MAIL)
 async SendEmail(@Payload(new ParseMessagePipe()) data: Mail) {
    return this.mailService.SendEmail(data);
  }

}
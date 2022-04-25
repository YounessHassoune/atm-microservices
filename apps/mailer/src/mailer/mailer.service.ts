import { Mail } from "@atm-microservices/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    private template={
      withdrawal: 'withdrawal',
      telecomCredit: 'telecomCredit',
    }
    async SendEmail(data: Mail) {
      await this.mailerService.sendMail({
        to: data.to,
        subject: data.subject,
        template: this.template[data.template], 
        context:{
          ...data.context
        }
      });
    }
}

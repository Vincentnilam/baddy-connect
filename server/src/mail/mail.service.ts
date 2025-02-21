import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  
  constructor(private readonly mailerService: MailerService) {
    
  }

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const verificationLink = `${process.env.BASE_APP_URL}/auth/verify-email?token=${token}`;

    await this.mailerService.sendMail({
      to,
      subject: 'Verify your BaddieConnect account',
      html: `
          <h3>Welcome to BaddieConnect!</h3>
          <p>Click the link below to verify your email:</p>
          <a href="${verificationLink}">${verificationLink}</a>
      `,
  });
}

}

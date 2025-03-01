import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,          
  ) {
    
  }

  async sendVerificationEmail(to: string, token: string): Promise<void> {

    const frontEndBaseUrl = this.configService.get<string>('FRONTEND_BASE_APP_URL');
    const verificationLink = `${frontEndBaseUrl}/verify-email?token=${token}`;

    await this.mailerService.sendMail({
      to,
      subject: 'Verify your BaddyConnect account',
      html: `
          <h3>Welcome to BaddyConnect!</h3>
          <p>Click the link below to verify your email:</p>
          <a href="${verificationLink}">${verificationLink}</a>
      `,
  });
}

}

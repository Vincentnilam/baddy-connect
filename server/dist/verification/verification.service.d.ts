import { User } from '../entities/user.entity';
import { VerificationToken } from '../entities/verificationtoken.entity';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
export declare class VerificationService {
    private verifRepo;
    private readonly mailService;
    constructor(verifRepo: Repository<VerificationToken>, mailService: MailService);
    generateAndSendToken(user: User): Promise<void>;
    createToken(user: User, token: string): Promise<void>;
    findByToken(token: string): Promise<VerificationToken | null>;
    deleteToken(token: string): Promise<void>;
}

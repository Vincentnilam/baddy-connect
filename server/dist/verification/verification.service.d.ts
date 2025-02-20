import { User } from '../entities/user.entity';
import { VerificationToken } from 'src/entities/verificationtoken.entity';
import { Repository } from 'typeorm';
export declare class VerificationService {
    private verifRepo;
    constructor(verifRepo: Repository<VerificationToken>);
    generateAndSendToken(user: User): Promise<void>;
    createToken(user: User, token: string): Promise<void>;
    findByToken(token: string): Promise<VerificationToken | null>;
    deleteToken(token: string): Promise<void>;
}

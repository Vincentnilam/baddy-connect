import { VerificationToken } from "./verificationtoken.entity";
export declare class User {
    id: number;
    email: string;
    username: string;
    password: string;
    verified: boolean;
    verificationTokens: VerificationToken[];
}

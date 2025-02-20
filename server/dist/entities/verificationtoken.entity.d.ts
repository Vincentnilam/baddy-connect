import { User } from "./user.entity";
export declare class VerificationToken {
    id: string;
    token: string;
    createdAt: Date;
    user: User;
}

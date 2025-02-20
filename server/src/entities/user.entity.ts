import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { VerificationToken } from "./verificationtoken.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ default: false })
    verified: boolean;

    @OneToMany(() => VerificationToken, (verificationToken) => verificationToken.user)
    verificationTokens: VerificationToken[];

}
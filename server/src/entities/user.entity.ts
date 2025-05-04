import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { VerificationToken } from "./verificationtoken.entity";
import { UserRole } from "../common/enums/roles.enum";
import { Event } from "./event.entity";

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

    @Column({ type: 'enum', enum: UserRole ,default: UserRole.USER })
    role: UserRole;

    @OneToMany(() => Event, (event) => event.organizer)
    events: Event[];
}
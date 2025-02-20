import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class VerificationToken {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.verificationTokens, { onDelete: 'CASCADE' })
  user: User;
}
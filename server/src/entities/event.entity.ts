import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, CreateDateColumn, JoinTable, ManyToMany } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Event {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  datetime: Date;

  @Column()
  maxPlayers: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  courtCount: number;

  @Column('decimal')
  price: number;

  @Column()
  isPublic: boolean;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.events, { eager: true })
  organizer: User;

  @ManyToMany(() => User, user => user.joinedEvents)
  @JoinTable()
  players: User[];

}

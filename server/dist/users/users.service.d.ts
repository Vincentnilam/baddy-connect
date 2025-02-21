import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(username: string, email: string, password: string): Promise<User>;
    update(userId: number, data: Partial<User>): Promise<User | null>;
}

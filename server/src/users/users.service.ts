import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../common/enums/roles.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(username: string): Promise<User | null> {
        return this.usersRepository.findOne({where: {username}});
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({where : {email}});
    }

    async create(username: string, email: string, password: string): Promise<User> {
        const newUser = this.usersRepository.create({username, email, password, role: UserRole.USER});
        return this.usersRepository.save(newUser);
    }

    async update(userId: number, data: Partial<User>): Promise<User | null> {
        await this.usersRepository.update(userId, data);
        return this.usersRepository.findOne({ where: { id: userId }});
    }

    async updateRole(id: number, role: UserRole) {
        const user = await this.usersRepository.findOne({ where: {id: id}});
        if (!user) throw new NotFoundException('User not found');

        user.role = role;
        return this.usersRepository.save(user);
    }
}

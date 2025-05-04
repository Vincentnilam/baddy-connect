import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { User } from '../entities/user.entity';
import { UserRole } from '../common/enums/roles.enum';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ){}

  async create(createEventDto: CreateEventDto, organizer: User): Promise<Event> {
    const event = this.eventRepository.create({
      ...createEventDto,
      organizer,
      createdAt: new Date(),
    })
    return this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id }, relations: ['organizer'] });
    if (!event) throw new NotFoundException('Event not found');
    return event;    
  }

  async update(id: string, dto: UpdateEventDto, user: User): Promise<Event> {
    const event = await this.findOne(id);
    if (user.role !== UserRole.ADMIN && event.organizer.id !== user.id) {
      throw new ForbiddenException('You can only update your own events');
    }

    Object.assign(event, dto);
    return this.eventRepository.save(event);
  }

  async remove(id: string, user: User): Promise<{ message: string}> {
    const event = await this.findOne(id);
    if (user.role !== UserRole.ADMIN && event.organizer.id !== user.id) {
      throw new ForbiddenException('You can only delete your own events');
    }
    await this.eventRepository.remove(event);
    return { message: 'Event deleted successfully' };
  }
}

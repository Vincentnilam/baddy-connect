import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(filter?: { organizerId?: number; isPublic?: boolean }): Promise<Event[]> {
    const where: any = {};
    if (filter?.organizerId) where.organizer = { id: filter.organizerId };
    if (filter?.isPublic !== undefined) where.isPublic = filter.isPublic;
    return this.eventRepository.find({ where });
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

  // register to session/event
  async registerPlayer(eventId: string, user: User): Promise<Event> {
    // we only care about current players to check 1. if they're already registered, 2. check if event is full, 3. add/remove player. hence,
    // we don't need to load the organizer relation
    const event = await this.eventRepository.findOne({ where: { id: eventId }, relations: ['players'] });
    if (!event) throw new NotFoundException('Event not found');

    // no duplicate registration
    const isRegistered = event.players.some(p => p.id === user.id);
    if (isRegistered) throw new BadRequestException('Already registered');

    if (event.players.length >= event.maxPlayers) {
      throw new BadRequestException('Event is full');
    }

    event.players.push(user);
    return this.eventRepository.save(event);
  }

  async unregisterPlayer(eventId: string, user: User): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id: eventId }, relations: ['players'] });
    if (!event) throw new NotFoundException('Event not found');
    event.players = event.players.filter(p => p.id !== user.id);
    return this.eventRepository.save(event);
  }
}

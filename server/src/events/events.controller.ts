import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from "../entities/event.entity";
import { UserRole } from '../common/enums/roles.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.ORGANIZER)
  async create(@Body() createEventDto: CreateEventDto, @Request() req) {
    return this.eventsService.create(createEventDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query('organizerId') organizerId?: number, @Query('isPublic') isPublic?: boolean): Promise<Event[]> {
    return this.eventsService.findAll({ organizerId, isPublic });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.ORGANIZER)
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @Request() req) {
    return this.eventsService.update(id, updateEventDto, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.ORGANIZER)
  async remove(@Param('id') id: string, @Request() req) {
    return this.eventsService.remove(id, req.user);
  }

  @Post(':id/join')
  @UseGuards(AuthGuard('jwt'))
  async joinEvent(@Param('id') id: string, @Request() req) {
    return this.eventsService.registerPlayer(id, req.user);
  }

  @Delete(':id/leave')
  @UseGuards(AuthGuard('jwt'))
  async leaveEvent(@Param('id') id: string, @Request() req) {
    return this.eventsService.unregisterPlayer(id, req.user);
  }
}




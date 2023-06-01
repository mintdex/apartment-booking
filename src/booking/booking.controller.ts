import { Controller, Get, Post, Body,
  Patch, Param, Delete } from '@nestjs/common';

import { Room } from '../room/entities/room.entity';
import { BookingService } from './booking.service';
import { RoomService } from '../room/room.service';
// import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';


@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly roomService: RoomService
  ) {}

  @Post()
  async create(@Body() body: any) {
    const rooms: Room[] = [];

    for (let i = 0; i < body.rooms.length; i++) {
      rooms.push(await this.roomService.findOne(body.rooms[i]));
    }

    body.rooms = rooms;

    return this.bookingService.create(body);
  }

  @Get()
  async findAll() {
    return await this.bookingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bookingService.findOne(id);
  }

  // @Get(':id/rooms')
  // async findRoomsByBookingId(@Param('id') id: string) {
  //   return await this.bookingService.findRoomsByBookingId(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
  //   return this.bookingService.update(+id, updateBookingDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bookingService.remove(id);
  }
}

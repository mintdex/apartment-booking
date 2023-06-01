import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Room } from '../room/entities/room.entity';
import { RoomService } from '../room/room.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private roomService: RoomService,
  ) {}
  
  async create(createBookingDto: CreateBookingDto) {
    try {
      await this.bookingRepository.save(createBookingDto);
      console.log('Booking Added!')
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    return await this.bookingRepository.find({relations: { rooms: true }})
  }

  async findOne(id: string) {
    const booking = 
      await this.bookingRepository.findOne({
        where: { bookingId: id },
        relations: { rooms: true }
    });
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }

    return booking;
  }

  async findRoomsByBookingId(id: string) {
    const booking = await this.bookingRepository.findOne({
      where: {
          bookingId: id,
      },
      relations: {
          rooms: true,
      }
    });
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }

    const { rooms } = booking;
    const roomArray: Room[] = [];

    for (let i = 0; i < rooms.length; i++) {
      console.log(rooms[i])
      roomArray.push(await this.roomService.findOne(rooms[i].roomId));
    }

    return roomArray;
  }

  // update(id: number, updateBookingDto: UpdateBookingDto) {
  //   return `This action updates a #${id} booking`;
  // }

  async remove(id: string) {
    const booking = await this.findOne(id);
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    const rs = await this.bookingRepository.remove(booking);
    console.log(`Booking removed bookingId=${id}`)
    return rs;
  }
}

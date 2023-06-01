import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      await this.roomRepository.save(createRoomDto);
      console.log('New apartment added successfully!')
    } catch (err) {
      throw err;
    }
  }
  
  async findAll(): Promise<any[]> {
    return await this.roomRepository.find();
  }

  async findAllAvailableRooms(query): Promise<any[]> {
    const { start, end } = query;
    console.log('start-end', start, end);
    return this.roomRepository.createQueryBuilder('room')
    .where(`room.roomId NOT IN 
      (SELECT booking_rooms_room.roomRoomId
      FROM booking_rooms_room 
      INNER JOIN booking 
      ON booking_rooms_room.bookingBookingId = booking.bookingId 
      WHERE (booking.checkin <= :start AND booking.checkout >= :start) 
      OR (booking.checkin < :end AND booking.checkout >= :end )
      OR (:start <= booking.checkin AND :end >= booking.checkin))`,
      { start, end }
    )
    .getMany();
  }

  async findOne(roomId: string) {
    const room = await this.roomRepository.findOne({where: {roomId: roomId}});
    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found.`);
    }

    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(id);
    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found.`);
    }

    Object.assign(room, updateRoomDto);

    await this.roomRepository.save(room);
    console.log(`Room updated roomId=${id}`)

    return `Updated room`;
  }

  async remove(id: string) {
    const room = await this.findOne(id);
    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
    const rs = await this.roomRepository.remove(room);
    console.log(`Room removed roomId=${id}`)
    return rs;
  }
}

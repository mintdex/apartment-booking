import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from '../booking/entities/booking.entity';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [
    RoomModule,
    TypeOrmModule.forFeature([Booking])
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule {}

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking/entities/booking.entity';
import { BookingModule } from './booking/booking.module';
import { Room } from './room/entities/room.entity';
import { RoomModule } from './room/room.module';
import { Image } from './image/entities/image.entity';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db',
      entities: [Room, Image, Booking],
      synchronize: true,
    }),
    RoomModule,
    ImageModule,
    BookingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

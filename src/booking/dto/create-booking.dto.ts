import { IsDefined, IsArray, IsString } from 'class-validator';

import { Room } from '../../room/entities/room.entity';

export class CreateBookingDto {
    @IsString()
    @IsDefined()
    adminId: string;

    @IsString()
    @IsDefined()
    customerId: string;

    @IsDefined()
    checkin: Date;

    @IsDefined()
    checkout: Date;

    @IsArray()
    rooms: Room[];
}

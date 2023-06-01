import { IsNumber, IsString, IsIn, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @IsString()
    @IsIn(['single bed', 'double bed', 'triple bed'])
    type: string;

    @IsString()
    description: string;

    @IsString()
    imageId: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;
}

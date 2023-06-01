import {
    IsDefined,
    IsNumber,
    IsOptional,
    IsString,
    IsIn
  } from 'class-validator';

export class CreateRoomDto {
    @IsString()
    @IsDefined()
    @IsIn(['single bed', 'double bed', 'triple bed'])
    type: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    imageId: string;

    @IsNumber()
    @IsDefined()
    price: number;

    @IsNumber()
    @IsDefined()
    quantity: number;
}

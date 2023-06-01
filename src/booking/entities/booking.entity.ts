import {
    Entity, Column, PrimaryGeneratedColumn,
    ManyToMany, JoinTable
} from 'typeorm';

import { Room } from '../../room/entities/room.entity';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    bookingId: string;

    @Column()
    adminId: string;

    @Column()
    customerId: string;

    @Column()
    checkin: Date;

    @Column()
    checkout: Date;

    @ManyToMany(() => Room)
    @JoinTable()
    rooms: Room[];
}
import { Entity, Column, PrimaryGeneratedColumn,
  OneToOne, JoinColumn } from 'typeorm';

import { Image } from '../../image/entities/image.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  roomId: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  imageId: string;

  @OneToOne(() => Image)
  @JoinColumn()
  image: string;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
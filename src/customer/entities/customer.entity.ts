import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Customer {
   @PrimaryGeneratedColumn('uuid')
   customerId: number

   @Column()
   name: string
}
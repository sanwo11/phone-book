import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PhoneBook } from './phonebook.entity';
import { TimeStamp } from './time.stamp';

@Entity()
export class PhoneBookNumber extends TimeStamp  {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
      type: String,
    })
    @Column({type: 'bigint'})
    @IsNotEmpty()
    phoneNumber: string;

  @ManyToOne(() => PhoneBook, (phone: PhoneBook) => phone.phonobooknumber)
  @JoinColumn()
  phoneBook: PhoneBook;

}
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PhoneBookNumber } from './phonebooknumber.entity';
import { TimeStamp } from './time.stamp';

@Entity()
export class PhoneBook extends TimeStamp {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        type: String,
    })
    @Column()
    @IsNotEmpty()
    name: string;

    
    @ApiProperty({
        type: String,
    })
    @Column()
    @IsEmail()
    email: string;

    @Column({ default: true })
    isActive: boolean;

    @ApiProperty({ type: [String] })
    @OneToMany(() => PhoneBookNumber, (phone: PhoneBookNumber) => phone.phoneBook,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    phonobooknumber: Array<PhoneBookNumber>;


}
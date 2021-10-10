import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneBookController } from './phonebook.controller';
import { PhoneBook } from './phonebook.entity';
import { PhoneBookService } from './phonebook.service';
import { PhoneBookNumber } from './phonebooknumber.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PhoneBook, PhoneBookNumber])],
    providers: [PhoneBookService],
    controllers: [PhoneBookController],
  })
export class PhoneBookModule{}
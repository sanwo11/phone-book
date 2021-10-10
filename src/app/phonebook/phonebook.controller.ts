import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { Request } from "express";
import { Pagination } from "nestjs-typeorm-paginate";
import { PhoneBook } from "./phonebook.entity";
import { PhoneBookService } from "./phonebook.service";

@Controller('phone-books')
export class PhoneBookController{

    constructor(readonly phonebookService: PhoneBookService){

    }

    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() phone: PhoneBook) {
        return this.phonebookService.create(phone);
    }

    @Get('/paginate')
    async findAll1(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('searchQuery') searchQuery: string
    ): Promise<Pagination<PhoneBook>> {
        limit = limit > 100 ? 100 : limit;
        return this.phonebookService.findAll1({
            page,
            limit,
        });
    }

    @Get('')
    async findAll(@Req() req: Request) {
        //limit = limit > 100 ? 100 : limit;
        return this.phonebookService.findAll(req);
    }

    @Get('/:id')
    findOne(@Param('id') id:number){
        return this.phonebookService.findOne(id);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    updatePhoneBook(@Param('id') id:number, @Body() body: PhoneBook){
        return this.phonebookService.updatePhoneBook(id, body)
    }

    @Delete('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    remove(@Param('id') id:number){
        return this.phonebookService.remove(id);
    }

    
    
}
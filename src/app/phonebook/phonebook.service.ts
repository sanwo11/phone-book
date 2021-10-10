import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { Between, Connection, getConnection, getManager, ILike, Repository } from "typeorm";
import { PhoneBook } from "./phonebook.entity";
import { PhoneBookNumber } from "./phonebooknumber.entity";

@Injectable()
export class PhoneBookService{

    constructor(
        @InjectRepository(PhoneBook)
        private phoneBookRepository: Repository<PhoneBook>,
    ) {}

    async create(book: PhoneBook): Promise<PhoneBook>{
        // get a connection and create a new query runner
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();

        // establish real database connection using our new query runner
        await queryRunner.connect();
        // lets now open a new transaction:
        await queryRunner.startTransaction();
        try {

            // execute some operations on this transaction:
            const phone = new PhoneBook() 
            phone.name = book.name,
            phone.email = book.email,
            phone.isActive = true;
            const record = await queryRunner.manager.save(phone)

            for await (const res of book.phonobooknumber) {
                const b = new PhoneBookNumber();
                b.phoneNumber = `${res}`,
                b.phoneBook = phone,
                queryRunner.manager.save(b)  
                await queryRunner.manager.save(b)  
            }
           
            // commit transaction now:
            await queryRunner.commitTransaction();
            return record
        } catch (err) {        
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction();
            throw new HttpException(err.sqlMessage, HttpStatus.FOUND);
        
        } finally {        
            // you need to release query runner which is manually created:
            await queryRunner.release();
        }
        
    }

    async findAll1(options: IPaginationOptions): Promise<Pagination<PhoneBook>> {
        return paginate<PhoneBook>(this.phoneBookRepository, options);
    }
    
    async findAll(res) {
        let search:object = {}
        let date:object = {}
        if(res.query.search){
            search = {
                where: [
                    { name: ILike(`${res.query.search}`) },
                    { email: ILike(`${res.query.search}`) },
                    //{ phonobooknumber: { phoneNumber : ILike(`${res.query.search}`) } },                    
                ]
            } 
        }

        if(res.query.from && res.query.to){
            date = { 
                where: {
                    created_at: Between(
                        new Date(res.query.from).toISOString(), 
                        new Date(res.query.to).toISOString()
                    ),
                }
            } 
        }

        const page:number = res.query.page ? parseInt(res.query.page) : 1 ;
        const limit:number = res.query.perpage ? parseInt(res.query.perpage) : 10 ;

        const option: object = { 
            relations: ["phonobooknumber"],
            ...search, 
            ...date,
            order: { name: "ASC", id: "DESC"}, 
            skip: (page - 1), take: limit 
        };  
        return this.phoneBookRepository.find(option)
    }
    
    findOne(id: number): Promise<PhoneBook> {        
        try {
            const phonebook = this.phoneBookRepository.findOneOrFail(id); 
            return phonebook
        } catch (error) {
            throw new HttpException('Record not found', HttpStatus.FOUND);
        }
        
    }

    async remove(id: number): Promise<PhoneBook> {
        const phone = await this.findOne(id)
        return this.phoneBookRepository.remove(phone);
    }

    async updatePhoneBook(id:number, createPhoneBook: PhoneBook) :Promise<PhoneBook>{
        const phone = await this.findOne(id)
        phone.name = createPhoneBook.name,
        phone.email = createPhoneBook.email,
        phone.isActive = true,
        this.phoneBookRepository.save(phone);
        return phone
    }
}
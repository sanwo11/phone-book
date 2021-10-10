import {  CreateDateColumn, UpdateDateColumn  } from 'typeorm';

export class TimeStamp {
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}
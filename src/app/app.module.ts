import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PhoneBookModule } from './phonebook/phonebook.mudule';

@Module({
  imports: [
    PhoneBookModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: "mysql",
          host: "localhost",
          port: 3306,
          username: "root",
          password: "123456",
          database: "phonebook",
          synchronize: true,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        } as TypeOrmModuleOptions;
      },
    }),    
  ],
})
export class AppModule {}

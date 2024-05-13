import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TypeHelpOptions } from "class-transformer";
import { dirname } from "path";

export const typeORMConfig :TypeOrmModuleOptions = {
    
    type: 'postgres',
    host:'localhost',
    port: 5432,
    username: 'stageus',
    password: '1234',
    database: 'nestjs_practice',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true

}
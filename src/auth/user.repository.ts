import { DataSource, Repository } from "typeorm";
import { User } from "./User.entity";
import { Injectable } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/authCredentialsDto";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager())
    }

    async createUser(authCredentialDto: AuthCredentialDto): Promise<User>{
        const {username, password} = authCredentialDto;

        const user = this.create({username, password});
        await this.save(user);
        return user;
    }
    
}
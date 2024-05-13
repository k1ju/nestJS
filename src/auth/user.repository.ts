import { DataSource, Repository } from "typeorm";
import { User } from "./User.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/authCredentialsDto";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager())
    }

    async createUser(authCredentialDto: AuthCredentialDto): Promise<User>{
        const {username, password} = authCredentialDto;

        const user = this.create({username, password});
        try{
            await this.save(user);
        } catch(error){
            if(error.code === '23505'){
                throw new ConflictException;
            } else{
                throw new InternalServerErrorException;
            }
        }
        return user;
    }
    
}
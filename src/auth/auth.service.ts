import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/authCredentialsDto';
import { User } from './User.entity';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository){}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<User> {
        return await this.userRepository.createUser(authCredentialDto);
    }
}

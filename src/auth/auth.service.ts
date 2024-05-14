import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/authCredentialDto';
import { User } from './User.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtservice: JwtService
    ){}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<User> {
        return await this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}>{
        const {username, password} = authCredentialDto; 
        const user = await this.userRepository.findOne({where:{username}})

        if(user && (await bcrypt.compare(password, user.password))){
            //토큰방급
            const payload = {username}
            const accessToken = this.jwtservice.sign(payload);
            
            return {accessToken};
        } else {
            //404상태코드반환안되는이유?
            throw new UnauthorizedException('login Failed');
        }
    }
}

import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./User.entity";
import { PassportStrategy } from "@nestjs/passport";
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userRepository: UserRepository){
        super({
            secretOrKey: process.env.JWT_SECRET || jwtConfig.secret , //토큰을 해독할때 쓰는키
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // 헤더의 bearer token추출
        })
    }

    async validate(payload){
        const {username} = payload;

        const user: User = await this.userRepository.findOne({where:{username:username}});

        if(!user){
            throw new UnauthorizedException
        } else{
            return user;
        }
    }
}
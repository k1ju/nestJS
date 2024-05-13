import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/authCredentialsDto';
import { User } from './User.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<User> {
        //return 있고없고의 차이는무엇?
        return this.authService.signUp(authCredentialDto)
    }
}

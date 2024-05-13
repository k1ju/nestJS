import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/authCredentialsDto';
import { User } from './User.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<User> {
        return this.authService.signUp(authCredentialDto)
    }
}

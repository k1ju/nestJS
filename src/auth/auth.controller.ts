import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/authCredentialDto';
import { User } from './User.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<User> {
        return this.authService.signUp(authCredentialDto)
    }

    @Post('signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDto);
    }

    @Get('test')
    @UseGuards(AuthGuard() )
    test(@GetUser() user: User){
        console.log("user", user);
    }
}



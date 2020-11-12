import { Body, Controller, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto)
    : Promise<{ message: string }> {
    await this.authService.signUp(createUserDto);

    return { message: 'Cadastro realizado com sucesso' };
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) credentiaslsDto: CredentialsDto)
    : Promise<{ token: string }> {

    return await this.authService.signIn(credentiaslsDto);
  }

  @Patch(':token')
  async confirmEmail(@Param('token') token: string) {
    await this.authService.confirmEmail(token);

    return { message: 'Email confirmado!' };
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@GetUser() user: User): User {
    return user;
  }
}
import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDTO } from '../models/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Signup Method
  @Post('/signup')
  signUp(@Body() AuthCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.authService.signUp(AuthCredentialsDTO);
  }

  //Login Method
  @Post('/login')
  login(
    @Body() AuthCredentialsDTO: AuthCredentialsDTO
  ): Promise<{ accessToken: string }> {
    return this.authService.login(AuthCredentialsDTO);
  }
}

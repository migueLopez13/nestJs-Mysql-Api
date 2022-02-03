import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDTO } from 'src/common/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post()
  async getPayload(@Body(ValidationPipe) token: string) {
    return this.auth.getPayload(token);
  }
  @Post('/login')
  async login(@Body(ValidationPipe) { name, password }: LoginDTO) {
    const valid = await this.auth.validateContact(name, password);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.auth.generateAccessToken(name);
  }
}

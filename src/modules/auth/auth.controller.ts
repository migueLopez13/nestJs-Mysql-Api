import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDTO } from 'src/common/dto/login.dto';
import { AuthRepository } from './auth.repository';

@Controller('auth')
export class AuthController {
  constructor(private authRepository: AuthRepository) {}

  @Post('/login')
  async login(@Body(ValidationPipe) { name, password }: LoginDTO) {
    const valid = await this.authRepository.validateContact(name, password);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authRepository.generateAccessToken(name);
  }
}

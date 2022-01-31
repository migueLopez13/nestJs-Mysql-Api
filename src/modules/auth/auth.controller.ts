import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { CredentialDTO } from 'src/common/dto/credential.dto';
import { AuthRepository } from './auth.repository';

@Controller('auth')
export class AuthController {
  constructor(private authRepository: AuthRepository) {}

  @Post('/login')
  async login(@Body() contactLogin: CredentialDTO) {
    const valid = await this.authRepository.validateContact(
      contactLogin.contactId,
      contactLogin.password,
    );
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authRepository.generateAccessToken(contactLogin.id);
  }
}

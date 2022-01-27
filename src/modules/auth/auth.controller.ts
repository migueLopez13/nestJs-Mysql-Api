import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { CredentialDTO } from 'src/common/dto/credential.dto';
import { AuthRepository } from './auth.repository';

@Controller('auth')
export class AuthController {
  constructor(private authRepository: AuthRepository) {}

  @Post()
  async createCredentials(@Body() credentials: CredentialDTO) {
    return this.authRepository.create(credentials);
  }

  @Post('/login')
  async login(@Body() contactLogin: CredentialDTO) {
    const { contactId, password } = contactLogin;
    const valid = await this.authRepository.validateContact(
      contactId,
      password,
    );
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authRepository.generateAccessToken(contactId);
  }
}

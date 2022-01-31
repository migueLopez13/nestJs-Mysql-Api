import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  name: string;

  @IsString()
  password: string;
}

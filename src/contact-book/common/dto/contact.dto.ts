import { IsString } from 'class-validator';

export class ContactDTO {
  id: string;

  @IsString()
  dni: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  phone: string;

  @IsString()
  gender: string;

  @IsString()
  address: string;
}

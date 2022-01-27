import { IsString, IsUUID } from 'class-validator';

export class ContactDTO {
  @IsUUID()
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
  password?: string;

  @IsString()
  gender: string;

  @IsString()
  address: string;

  constructor(
    id: string,
    name: string,
    surname: string,
    phone: string,
    gender: string,
    dni: string,
    address: string,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.dni = dni;
    this.gender = gender;
    this.phone = phone;
    this.address = address;
  }
}

import { IsString, IsUUID } from 'class-validator';

export class CredentialDTO {
  @IsUUID()
  id?: string;

  @IsString()
  contactId: string;

  @IsString()
  password: string;

  constructor(id: string, contactId: string, password: string) {
    this.id = id;
    this.contactId = contactId;
    this.password = password;
  }
}

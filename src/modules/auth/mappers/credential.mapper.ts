import { CredentialDTO } from 'src/common/dto/credential.dto';
import { Credential } from 'src/common/entities/credential.entity';

export class CredentialMapper {
  dtoToEntity(credentialDTO: CredentialDTO): Credential {
    return new Credential(credentialDTO.contactId, credentialDTO.password);
  }

  entityToDto(credential: Credential): CredentialDTO {
    return new CredentialDTO(
      credential.id,
      credential.contactId,
      credential.password,
    );
  }
}

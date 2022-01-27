import { ContactDTO } from 'src/common/dto/contact.dto';
import { Contact } from 'src/common/entities/contact.entity';

export class ContactMapper {
  dtoToEntity(contactDTO: ContactDTO): Contact {
    return new Contact(
      contactDTO.id,
      contactDTO.dni,
      contactDTO.name,
      contactDTO.surname,
      contactDTO.phone,
      contactDTO.address,
      contactDTO.gender,
    );
  }

  entityToDto(contactEntity: Contact): ContactDTO {
    return new ContactDTO(
      contactEntity.id,
      contactEntity.name,
      contactEntity.surname,
      contactEntity.phone,
      contactEntity.gender,
      contactEntity.dni,
      contactEntity.address,
    );
  }
}

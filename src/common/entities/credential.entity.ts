import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Contact } from './contact.entity';

@Entity('credential')
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Contact, (contact) => contact.id)
  @JoinColumn({ name: 'contactId' })
  contactId: string;

  @Column('varchar', { length: 150 })
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  constructor(uuid: string, password: string) {
    this.contactId = uuid;
    this.password = password;
  }
}

import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Contact {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  dni: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  phone: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return this.password === password;
  }

  constructor(
    id: string,
    dni: string,
    password: string,
    name: string,
    surname: string,
    phone: string,
    gender: string,
  ) {
    this.id = id;
    this.dni = dni;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.gender = gender;
  }
}

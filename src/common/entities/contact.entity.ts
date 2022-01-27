import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('contact')
export class Contact {
  @PrimaryColumn('varchar', { length: 200 })
  id: string;

  @Column('varchar', { length: 10 })
  dni: string;

  @Column('varchar', { length: 50, unique: true })
  name: string;

  @Column('varchar', { length: 50 })
  surname: string;

  @Column('varchar', { length: 20 })
  phone: string;

  @Column('varchar', { length: 10 })
  gender: string;

  @Column('varchar', { length: 200 })
  address: string;

  constructor(
    id: string,
    dni: string,
    name: string,
    surname: string,
    phone: string,
    address: string,
    gender: string,
  ) {
    this.id = id;
    this.dni = dni;
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.address = address;
    this.gender = gender;
  }
}

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryColumn()
  id: string;

  @Column()
  dni: string;

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
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
//
import { City } from 'src/infrastructure/entities/city.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column('varchar', { unique: true })
  username: string;

  @Column('text')
  password: string;

  @Column('varchar', { length: 10, default: "pt_br" })
  lang: string;

  @Column('varchar', { length: 10, default: "metric" })
  units: string;

  // https://typeorm.io/many-to-one-one-to-many-relations
  @OneToMany(() => City, (city) => city.user)
  cities: City[];

  @CreateDateColumn({ name: 'create_date' })
  create_date: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updated_date: Date;

  @Column({ nullable: true })
  last_login?: Date;

  @Column('varchar', { nullable: true })
  hash_refresh_token: string;
}

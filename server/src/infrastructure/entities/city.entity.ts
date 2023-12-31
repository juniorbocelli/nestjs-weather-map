import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
//
import { User } from 'src/infrastructure/entities/user.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('integer')
  apiId: number;

  // https://typeorm.io/many-to-one-one-to-many-relations
  @ManyToOne(() => User, (user) => user.cities)
  user: User;

  @CreateDateColumn({ name: 'create_date' })
  create_date: Date;
}

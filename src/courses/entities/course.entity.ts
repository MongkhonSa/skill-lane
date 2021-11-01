import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  category: string;
  @Column()
  image: string;
  @Column()
  subject: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  numberOfStudent: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.courses)
  user: number;
}

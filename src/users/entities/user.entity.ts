import { Course } from 'src/courses/entities/course.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';
import { UserPassword } from './userPassword.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  nickName: string;

  @Column()
  birthday: Date;

  @Column()
  gender: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserPassword, (userPassword) => userPassword.user)
  password: UserPassword[];

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}

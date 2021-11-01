import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserPassword } from './entities/userPassword.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserPassword)
    private userPasswordRepository: Repository<UserPassword>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }
  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['roles'],
    });
  }

  async findLatestPassword(userId: number): Promise<UserPassword | undefined> {
    return this.userPasswordRepository.findOne({
      user: userId,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      nickName: updateUserDto.nickName,
      birthday: updateUserDto.birthday,
      gender: updateUserDto.gender,
    });
  }
}

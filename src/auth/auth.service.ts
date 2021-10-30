import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const latestUserPassword = await this.usersService.findLatestPassword(
      user.id,
    );
    console.log(latestUserPassword);
    if (
      user &&
      password &&
      compareSync(password, latestUserPassword.password)
    ) {
      return this.jwtService.sign({
        test: user.id,
      });
    }
    throw new UnauthorizedException();
  }
}

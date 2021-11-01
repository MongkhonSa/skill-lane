import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserPassword } from './users/entities/userPassword.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CoursesModule } from './courses/courses.module';
import { Course } from './courses/entities/course.entity';
import { Role } from './users/entities/role.entity';
import { RolesGuard } from './users/roles.guard';
import { JwtStrategy } from './auth/jwt.strategy';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, UserPassword, Course, Role],
      namingStrategy: new SnakeNamingStrategy(),

      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [JwtStrategy, AppService, RolesGuard],
})
export class AppModule {}

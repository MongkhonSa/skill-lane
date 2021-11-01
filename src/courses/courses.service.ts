import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw, MoreThan } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}
  async create(userId: number, createCourseDto: CreateCourseDto) {
    const course = new Course();
    course.name = createCourseDto.name;
    course.description = createCourseDto.description;
    course.category = createCourseDto.category;
    course.image = createCourseDto.image;
    course.subject = createCourseDto.subject;
    course.startTime = createCourseDto.startTime;
    course.endTime = createCourseDto.endTime;
    course.numberOfStudent = createCourseDto.numberOfStudent;
    course.user = userId;
    const result = await this.courseRepository.save(course);
    return result;
  }

  findAll(name: string, date: string) {
    const query = {
      where: {
        ...(name && { name: Raw((alias) => `${alias} ILIKE '%${name}%'`) }),
        ...(date && {
          startTime: Raw((alias) => `${alias} <= :date`, { date }),
          endTime: Raw((alias) => `${alias} >= :date`, { date }),
        }),
      },
    };
    return this.courseRepository.find({
      ...query,
      relations: ['user'],
    });
  }

  findMe(userId: number, name: string, date: string) {
    const query = {
      where: {
        user: userId,
        ...(name && { name: Raw((alias) => `${alias} ILIKE '%${name}%'`) }),
        ...(date && {
          startTime: Raw((alias) => `${alias} <= :date`, { date }),
          endTime: Raw((alias) => `${alias} >= :date`, { date }),
        }),
      },
    };
    return this.courseRepository.find({
      ...query,
      relations: ['user'],
    });
  }
}

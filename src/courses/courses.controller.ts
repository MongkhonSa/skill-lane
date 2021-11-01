import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/common/enum/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Instructor)
  create(@Request() req, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(req.user.userId, createCourseDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('name') name: string, @Query('date') date: string) {
    return this.coursesService.findAll(name, date);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Instructor)
  @Get('me')
  findMe(
    @Request() req,
    @Query('name') name: string,
    @Query('date') date: string,
  ) {
    return this.coursesService.findMe(req.user.userId, name, date);
  }
}

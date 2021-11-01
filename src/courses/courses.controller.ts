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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(req.user.userId, createCourseDto);
  }

  @Get()
  findAll(@Query('name') name: string, @Query('date') date: string) {
    return this.coursesService.findAll(name, date);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findMe(
    @Request() req,
    @Query('name') name: string,
    @Query('date') date: string,
  ) {
    return this.coursesService.findMe(req.user.userId, name, date);
  }
}

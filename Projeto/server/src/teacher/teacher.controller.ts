import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { FindDto } from './dto/find-dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll(@Query() params: FindDto) {
    return this.teacherService.findAll(params.index, params.step);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}

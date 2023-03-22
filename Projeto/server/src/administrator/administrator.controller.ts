import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { FindDto } from './dto/find-dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';

@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) { }

  @Post()
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorService.create(createAdministratorDto);
  }

  @Get()
  findAll(@Query() params: FindDto) {
    return this.administratorService.findAll(params.index, params.step);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administratorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdministratorDto: UpdateAdministratorDto,
  ) {
    return this.administratorService.update(+id, updateAdministratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administratorService.remove(+id);
  }
}

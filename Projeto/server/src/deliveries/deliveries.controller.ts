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
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { FindDto } from './dto/find-dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) { }

  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @Get()
  findAll(@Query() params: FindDto) {
    return this.deliveriesService.findAll(params.index, params.step);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveriesService.update(+id, updateDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(+id);
  }
}

import { Controller, Get, Param, Delete } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  findAll() {
    return this.gatewayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gatewayService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gatewayService.remove(+id);
  }
}

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDutyDto } from './duty/duty.dto';
import { Duty } from './duty/duty.interface';
import { Result } from './result.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/duties/:id')
  getDuty(@Param('id') id: string): Promise<Duty> {
    return this.appService.getDuty(id);
  }

  @Get('/duties')
  getDuties(): Promise<Duty[]> {
    return this.appService.getDuties();
  }

  @Post('/duties')
  createDuty(@Body() createDutyDto: CreateDutyDto): Promise<Result> {
    return this.appService.createDuty(createDutyDto.name);
  }

  @Put('/duties/:id')
  updateDuty(@Param('id') id: string, @Body() createDutyDto: CreateDutyDto): Promise<Result> {
    return this.appService.updateDuty(id, createDutyDto.name);
  }
}

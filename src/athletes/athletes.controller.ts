import { Body, Controller, Post } from '@nestjs/common';
import { CreateAthleteDto } from './dto/createAthletes.dto';
import { AthletesService } from './athletes.service';

@Controller('api/v1/athletes')
export class AthletesController {
  constructor(private readonly athletesService: AthletesService) {}
  @Post()
  async createUpdateAthlete(@Body() createAthleteDto: CreateAthleteDto) {
    await this.athletesService.createAthlete(createAthleteDto);
  }
}

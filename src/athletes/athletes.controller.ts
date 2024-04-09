import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAthleteDto } from './dto/createAthletes.dto';
import { AthletesService } from './athletes.service';
import { Athlete } from './interfaces/athletes.interface';

@Controller('api/v1/athletes')
export class AthletesController {
    constructor(private readonly athletesService: AthletesService) {}

    @Post()
    async createUpdateAthlete(@Body() createAthleteDto: CreateAthleteDto) {
      await this.athletesService.createAthlete(createAthleteDto);
    }
  
    @Get()
    async findAthlete(): Promise<Athlete[]> {
      return this.athletesService.findAllAthlete();
    }

}

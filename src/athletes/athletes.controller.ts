import { Body, Controller, Delete, Get, Logger, Post, Query } from '@nestjs/common';
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
  async findAthlete(
    @Query('email') email: string): Promise<Athlete[] | Athlete> {
      if (email) {
        return this.athletesService.findAthletebyEmail(email);  
      } else {
        return this.athletesService.findAllAthlete();
      }
    }

    @Delete()
    async deleteAthelte(
      email: string): Promise<void> {
      this.athletesService.deleteAthelte(email);
    }
}

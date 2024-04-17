import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CreateAthleteDto } from './dto/createAthletes.dto';
import { AthletesService } from './athletes.service';
import { Athlete } from './interfaces/athletes.interface';
import e from 'express';
import { athletesValidationParameters } from './pipes/athletes-validation-parameters';

@Controller('api/v1/athletes')
export class AthletesController {
  constructor(private readonly athletesService: AthletesService) {}


  @Post()
  @UsePipes(ValidationPipe)
  async createAthlete(@Body() createAthleteDto: CreateAthleteDto) {
    await this.athletesService.createAthlete(createAthleteDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateAthlete(
    @Body() createAthleteDto: CreateAthleteDto,
    @Param('_id', athletesValidationParameters) _id: string,): Promise<void> {
    await this.athletesService.updateAthlete(_id, createAthleteDto);
  }

 
  @Get('/')
  async findAthlete(
    @Query('_id', athletesValidationParameters) _id: string,
    @Query('email', athletesValidationParameters) email: string,
  ): Promise<Athlete> {   
    if(email) {
      return this.athletesService.findAthleteByEmail(email);
    }else if(_id) {
      return this.athletesService.findAthletebyId(_id);
    }else {
  throw new BadRequestException('Please provide eigther email or User_ID')
  }
  }
  @Get()
  async findAllAthletes(athletesValidationParameters): Promise<Athlete[]> {
    return this.athletesService.findAllAthlete();
  }

  @Delete('/:_id')
  async deleteAthelte(
    @Param('/:_id', athletesValidationParameters) _id: string): Promise<void> {
    return this.athletesService.deleteAthelte(_id);
  }
}

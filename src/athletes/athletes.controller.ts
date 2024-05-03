import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAthleteDto } from './dto/createAthletes.dto';
import { AthletesService } from './athletes.service';
import { Athlete } from './interfaces/athletes.interface';
import { athletesValidationParameters } from './pipes/athletes-validation-parameters';
import { UpdateAthleteDto } from './dto/updateAthlete.dto';

@Controller('api/v1/athletes')
export class AthletesController {
  constructor(private readonly athletesService: AthletesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAthlete(@Body() createAthleteDto: CreateAthleteDto): Promise<Athlete> {
    const athlete = await this.athletesService.createAthlete(createAthleteDto);
    return athlete;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateAthlete(
    @Body() updatedAthleteDto: UpdateAthleteDto,
    @Param('_id', athletesValidationParameters) _id: string,
  ): Promise<void> {
    const updatedAthlete = await this.athletesService.updateAthlete(_id, updatedAthleteDto);
    return updatedAthlete;
  }

  @Get('/')
  async findAthlete(
    @Query('_id', athletesValidationParameters) _id: string,
    @Query('email', athletesValidationParameters) email: string,
  ): Promise<Athlete> {
    try {
      if (email) {
        return await this.athletesService.findAthleteByEmail(email);
      }
      if (_id) {
        return await this.athletesService.findAthletebyId(_id);
      }
      throw new BadRequestException('Please provide either email or User_ID');
    } catch (error) {
      throw new BadRequestException((error as Error).message)
    }
  }
  // @Get()
  // async findAllAthletes(athletesValidationParameters): Promise<Athlete[]> {
  //   return this.athletesService.findAllAthlete();
  // }

  @Delete(':_id')
  async deleteAthelte(
    @Param('_id', athletesValidationParameters) _id: string,
  ): Promise<void> {
      return this.athletesService.deleteAthelte(_id);
  }
}

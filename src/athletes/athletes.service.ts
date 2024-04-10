import { Injectable, Logger } from '@nestjs/common';
import { CreateAthleteDto } from './dto/createAthletes.dto';
import { Athlete } from './interfaces/athletes.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class AthletesService {
  private athletes: Athlete[] = [];
  private readonly logger = new Logger(AthletesService.name);

  async createAthlete(createAthleteDto: CreateAthleteDto): Promise<void> {
    this.logger.log(
      `createAthleteDto: ${JSON.stringify({ createAthleteDto })}`,
    );

    const { email } = createAthleteDto;
    const foundAthlete = await this.athletes.find(
      (athlete) => athlete.email === email,
    );

    if (foundAthlete) {
      await this.update(foundAthlete, createAthleteDto);
    } else {
      await this.create(createAthleteDto);
    }
  }

  async findAllAthlete(): Promise<Athlete[]> {
    return await this.athletes;
  }

  private create(createAthleteDto: CreateAthleteDto) {
    const { name, email, phone } = createAthleteDto;
    const athlete = {
      _id: randomUUID(),
      name,
      email,
      phone,
      ranking: 1,
      positionRanking: 1,
      urlPhotoAthlete: 'www.google.com',
      category: 'Profissional',
    };
    this.logger.log(`athlete: ${JSON.stringify(athlete)}`);
    this.athletes.push(athlete);
  }

  // async findOne(id: string)
  //     return `This action returns a #${id} athlete`;
  // }

  private update(
    foundAthlete: Athlete,
    createAthleteDto: CreateAthleteDto,
  ) {
    const { name } = createAthleteDto;
    foundAthlete.name = name;
    return foundAthlete;
  }

  // async remove(id: string) {
  //     return `This action removes a #${id} athlete`;
  // }
}

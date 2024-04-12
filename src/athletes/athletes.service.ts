import { Injectable, Logger } from '@nestjs/common';
import { CreateAthleteDto } from './dto/createAthletes.dto';
import { Athlete } from './interfaces/athletes.interface';
import { randomUUID } from 'crypto';
import { NotFoundError } from 'rxjs';
import { error } from 'console';

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

  async findAthletebyEmail(email:string): Promise<Athlete>{
    const athletes = await this.athletes;
    const foundAthlete = athletes.find(athlete => athlete.email === email);
    if (foundAthlete) {
      return foundAthlete;
    }else {
      throw new Error(`Athlete ${email} not found`);
    } 
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

  // async findOne(): Promise<Athlete>{
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

   async deleteAthlete(email: string): Promise<Athlete> {
      const foundAthlete = this.athlete.find(athlete => athlete.email === email);
      if (foundAthlete) {
        this.athletes = this.athletes.filter(athlete => athlete.email !== email);
        return foundAthlete;
      } else {
        throw new Error(`Athlete ${email} not found`);
      }

  }
}

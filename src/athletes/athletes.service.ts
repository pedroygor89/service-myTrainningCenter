import { Injectable, Logger } from '@nestjs/common';
import { CreateAthleteDto } from './dto/createAthletes.dto';
import { Athlete } from './interfaces/athletes.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class AthletesService {
  private athletes: Athlete[] = [];
  private readonly logger = new Logger(AthletesService.name);

  async createAthlete(createAthleteDto: CreateAthleteDto): Promise<string> {
    this.logger.log(`createAthleteDto: ${JSON.stringify({ createAthleteDto })}`);
    return 'This action adds a new athlete';

    await this.create(createAthleteDto);
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
    // async findAll() {
    //     return 'This action returns all athletes';
    // }

    // async findOne(id: string) {
    //     return `This action returns a #${id} athlete`;
    // }

    // async update(id: string) {
    //     return `This action updates a #${id} athlete`;
    // }

    // async remove(id: string) {
    //     return `This action removes a #${id} athlete`;
    // }

}

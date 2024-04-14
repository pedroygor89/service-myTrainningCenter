import { Injectable, Logger } from '@nestjs/common';
import { CreateAthleteDto } from './dto/createAthletes.dto';
//import { UpdateAthleteDto } from './dto/updateAthletes.dto';
import { Athlete } from './interfaces/athletes.interface';
import { randomUUID } from 'crypto';
import { NotFoundError } from 'rxjs';
import { error } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { AthletesModule } from './athletes.module';

@Injectable()
/**
 * Service class for managing athletes.
 */
export class AthletesService {
  private athletes: Athlete[] = [];

  // inject Athlete model into the AthletesService using document injection
  constructor(@InjectModel('Athlete') private readonly AthletesModule: Model<Athlete>)

  private readonly logger = new Logger(AthletesService.name);

  async createAthlete(createAthleteDto: CreateAthleteDto): Promise<void> {
    this.logger.log(`createAthleteDto: ${JSON.stringify({ createAthleteDto })}`,);

    const { email } = createAthleteDto;
    const foundedAthlete = await this.AthletesModule.findOne({email}).exec();

    if (foundedAthlete) {
      await this.update(foundedAthlete, createAthleteDto);
    } else {
      await this.create(createAthleteDto);
    }
  }

  async findAllAthlete(): Promise<Athlete[]> {
    return await this.athletes;
  }

  async findAthletebyEmail(email:string): Promise<Athlete>{
    const athletes = await this.athletes;
    const foundedAthlete = athletes.find(athlete => athlete.email === email);
    if (foundedAthlete) {
      return foundedAthlete;
    }else {
      throw new Error(`Athlete ${email} not found`);
    } 
  }

  private async create(createAthleteDto: CreateAthleteDto): Promise<Athlete> {
    
    
  const createdAthlete =  new this.AthletesModule(createAthleteDto)
   
 return await createdAthlete.save();
  }
  private async update(foundedAthlete: Athlete, createAthleteDto: CreateAthleteDto): Promise<Athlete> {

    return await this.AthletesModule.findOneAndUpdate({email: foundedAthlete.email}, {set: createAthleteDto}).exec();
  }

   async deleteAthelte(email: string): Promise<void> {
    const foundedAthlete = await this.athletes.find( athlete => athlete.email === email)
    this.athletes = this.athletes.filter(athlete => athlete.email !== foundedAthlete.email)
  }
}

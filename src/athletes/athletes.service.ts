import { Injectable, Logger } from '@nestjs/common';
import { CreateAthleteDto } from './dto/createAthletes.dto';
import { Athlete } from './interfaces/athletes.interface';
import { Model } from 'mongoose'; // Fix for Problem 1
import { InjectModel } from '@nestjs/mongoose'; // Fix for Problem 2
import { AthletesModule } from './athletes.module';

@Injectable()
/**
 * Service class for managing athletes.
 */
export class AthletesService {

  // inject Athlete model into the AthletesService using document injection
  constructor(@InjectModel('Athlete') private readonly athleteModel: Model<Athlete>) {}

  private readonly logger = new Logger(AthletesService.name);

  async createAthlete(createAthleteDto: CreateAthleteDto): Promise<void> {
    this.logger.log(`createAthleteDto: ${JSON.stringify({ createAthleteDto })}`,);

    const { email } = createAthleteDto;
    const foundedAthlete = await this.athleteModel.findOne({email}).exec();

    if (foundedAthlete) {
      await this.updateAthlete(foundedAthlete, createAthleteDto);
    } else {
      await this.create(createAthleteDto);
    }
  }

  async findAllAthlete(): Promise<Athlete[]> {
    return await this.athleteModel.find().exec();
  }

  async findAthletebyEmail(email:string): Promise<Athlete>{
    const foundedAthlete = this.athleteModel.findOne({email}).exec();
    if (foundedAthlete) {
      return foundedAthlete;
    }else {
      throw new Error(`Athlete ${email} not found`);
    } 
  }

  private async create(createAthleteDto: CreateAthleteDto): Promise<Athlete> {
    
    
  const createdAthlete =  new this.athleteModel(createAthleteDto)
   
 return await createdAthlete.save();
  }
  async updateAthlete(foundedAthlete: Athlete, createAthleteDto: CreateAthleteDto): Promise<Athlete> {
    return await this.athleteModel.findOneAndUpdate({email: foundedAthlete.email}, {set: createAthleteDto}).exec();
  }

   async deleteAthelte(email: string): Promise<any> {
    return await this.athleteModel.deleteOne({email}).exec();
  }
}

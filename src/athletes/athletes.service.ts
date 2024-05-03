import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAthleteDto } from './dto/createAthletes.dto';
import { Athlete } from './interfaces/athletes.interface';
import { Model } from 'mongoose'; // Fix for Problem 1
import { InjectModel } from '@nestjs/mongoose'; // Fix for Problem 2
import { UpdateAthleteDto } from './dto/updateAthlete.dto';


@Injectable()
/**
 * Service class for managing athletes.
 */
export class AthletesService {
  // inject Athlete model into the AthletesService using document injection
  constructor(
    @InjectModel('Athlete') private readonly athleteModel: Model<Athlete>,
  ) {}

  private readonly logger = new Logger(AthletesService.name);

  async createAthlete(createAthleteDto: CreateAthleteDto): Promise<Athlete> {
    const { email } = createAthleteDto;
    const foundedAthlete = await this.athleteModel.findOne({ email }).exec();

    if (foundedAthlete) {
      throw new Error(`Athlete ${email} already exists`);
    }
    const createdAthlete = new this.athleteModel(createAthleteDto);
    return await createdAthlete.save();
  }

  async findAllAthlete(): Promise<Athlete[]> {
    return await this.athleteModel.find().exec();
  }

  async findAthleteByEmail(email: string): Promise<Athlete> {
    const foundedAthlete = await this.athleteModel.findOne({ email }).exec();
    if (!foundedAthlete) {
      throw new Error(`Athlete ${email} not found`);
    }
    return await foundedAthlete;
  }

  async findAthletebyId(_id: string): Promise<Athlete> {
    const foundedAthlete = this.athleteModel.findOne({ _id }).exec();
    if (!foundedAthlete) {
      throw new NotFoundException(`Athlete ${_id} not found`);
    }
    return await foundedAthlete;
  }

  async updateAthlete(
    _id: string,
    updateAthleteDto: UpdateAthleteDto,
  ): Promise<void> {
    const foundedAthlete = await this.athleteModel.findOne({ _id }).exec();

    if (!foundedAthlete) {
      throw new NotFoundException(`Athlete ${_id} not found`);
    }
    await this.athleteModel
      .findOneAndUpdate({ _id }, { $set: updateAthleteDto })
      .exec();
  }

  async deleteAthelte(_id: string): Promise<any> {
  const foudedAthlete =  await this.athleteModel.findOne({ _id }).exec();

    if(!foudedAthlete){
      throw new NotFoundException(`Athlete ${_id} not found`); 
    }
    await this.athleteModel.findOneAndDelete({ _id }).exec();
    console.log(`Athlete ${foudedAthlete} deleted`);
  }
}
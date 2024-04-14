import { Module } from '@nestjs/common';
import { AthletesController } from './athletes.controller';
import { AthletesService } from './athletes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { athleteSchema } from './interfaces/athlete.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Athlete', schema: athleteSchema, collection:'athletes'}])
  ],
  controllers: [AthletesController],
  providers: [AthletesService],
})
export class AthletesModule {}

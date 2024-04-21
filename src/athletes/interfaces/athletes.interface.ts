import { Document } from 'mongoose';
// Extend interdave using mongoose schema
export interface Athlete extends Document{ 
  readonly _id: string;
  readonly email: string;
  readonly phone: string;
  name: string;
  ranking: number;
  positionRanking: number;
  urlPhotoAthlete: string;
  category: string;
  gender?: string;
  cpf?: string;
}

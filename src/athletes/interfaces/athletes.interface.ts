export interface Athlete {
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

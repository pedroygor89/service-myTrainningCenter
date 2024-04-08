export interface Player {
  readonly _id: string;
  readonly email: string;
  readonly phone: string;
  name: string;
  ranking: number;
  positionRanking: number;
  urlPhotoPlayer: string;
  category: string;
  gender?: string;
  cpf?: string;
}

import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateAthleteDto {
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly phone: string;

  readonly ranking: number;
  readonly positionRanking: number;
  readonly urlPhotoAthlete: string;
}
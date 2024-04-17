import { IsEmail, IsNotEmpty } from "class-validator";



export class CreateAthleteDto {
    @IsNotEmpty()
    readonly name: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly phone: string;
}


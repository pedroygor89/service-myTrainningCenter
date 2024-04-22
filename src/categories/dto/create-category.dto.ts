import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { create } from "domain"

export class CreateCategoryDto {
    
    @IsString()
    @IsNotEmpty()
    readonly category: string;
    
    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsArray()
    @ArrayMinSize(1)
    events: Array<Event>;
}
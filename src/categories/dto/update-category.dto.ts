import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
  readonly category: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Event[];
}
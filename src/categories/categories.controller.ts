import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './interfaces/category.interface';
import { CategoriesService } from './categories.service';

@Controller('api/v1/categories')
export class CategoriesController {

constructor(private readonly categoriesService: CategoriesService) {}

@Post()
@UsePipes(ValidationPipe)
async createCategory(
    @Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoriesService.createCategory(createCategoryDto);

}}
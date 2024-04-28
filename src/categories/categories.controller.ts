import { Body, Controller, Get, Post, Param, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
// Remove the duplicate import statement for 'Category'
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '../../dist/categories/interfaces/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async searchCategory(): Promise<Category[]> {
    return await this.categoriesService.searchCategory();
  }

  @Get('/:category')
  async searchCategoryById(
    @Param('category') category: string,
  ): Promise<Category> {
    return await this.categoriesService.searchCategoryById(category);
  }
  async updateCategory(
    @Param('category') category: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    return await this.categoriesService.updateCategory(
      category,
      updateCategoryDto,
    );
  }
}

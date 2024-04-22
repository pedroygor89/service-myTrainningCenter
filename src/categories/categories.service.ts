import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { category } = createCategoryDto;
    const foundedCategory = await this.categoryModel
      .findOne({ category })
      .exec();

    if (foundedCategory) {
      throw new BadRequestException(`Category already exist ${category}`);
    }
    const createCategory = new this.categoryModel(createCategoryDto);
    return await createCategory.save();
  }
}

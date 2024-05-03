import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  async searchCategory(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async searchCategoryById(category: string): Promise<Category> {
    const foundedCategory = await this.categoryModel
      .findOne({ category })
      .exec();
    // console.log(foundedCategory);
    if (!foundedCategory) {
      throw new NotFoundException(`Category not Found ${category}`);
    }
    return foundedCategory;
  }

  async updateCategory(
    category: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const foundedCategory = await this.categoryModel
      .findOne({ category })
      .exec();

    if (!foundedCategory) {
      throw new NotFoundException(`Category not Found ${category}`);
    }
    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: updateCategoryDto })
      .exec();
  }
  async insertCategoryIntoAthlete(params: string[]): Promise<void> {
    const category = params['category'];
    const idAthlete = params['idAthlete'];

    const foundedCategory = await this.categoryModel
      .findOne({ category })
      .exec();

    if (!foundedCategory) {
      throw new NotFoundException(`Category not Found ${category}`);
    }
    // Create Athlete object using idAthlete
    // Athlete already in the category
    foundedCategory.athletes.push(idAthlete);
    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: foundedCategory })
      .exec();
  }
}

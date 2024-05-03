import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Category } from './category.interface';

export const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    events: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        
        },
        operation: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
       
        },
        location: {
          type: String,
     
        },
        value: {
          type: Number,
          required: true,
        },
      },
    ],
    athletes: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        }
      },
    ],
  },
  { timestamps: true, collection: 'categories' },
);

const CategoryModel = model<Category>('category', CategorySchema);

export default CategoryModel;

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
          required: true,
        },
        operation: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        location: {
          type: String,
          required: true,
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
        },
        phone: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        birthdate: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true, collection: 'categories' },
);

const CategoryModel = model<Category>('category', CategorySchema);

export default CategoryModel;

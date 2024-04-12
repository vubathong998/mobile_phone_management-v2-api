import mongoose from 'mongoose';
import { BaseSchema } from './BaseSchema';
import { CategoriesCreateRequest } from '../type/Categories/CategoriesRequest';

const { Schema } = mongoose;

const CategoriesSchema = new Schema<CategoriesCreateRequest>({
    categoryName: {
        type: String,
        require: true,
        unique: true
    }
});

CategoriesSchema.add(BaseSchema);

export default mongoose.model('Categories', CategoriesSchema);

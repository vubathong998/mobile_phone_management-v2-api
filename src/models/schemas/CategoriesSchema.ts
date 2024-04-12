import mongoose from 'mongoose';
import { CategoriesSchemaModel } from '../type/Categories/CategoriesModel';
import { BaseSchema } from './BaseSchema';
// import { BaseSchema } from './BaseModel';

const { Schema } = mongoose;

const CategoriesSchema = new Schema({
    categoryName: {
        type: String,
        require: true,
        unique: true
    }
});

CategoriesSchema.add(BaseSchema);

export default mongoose.model('Categories', CategoriesSchema);

import Joi, { SchemaMap } from 'joi';
import { CategoriesCreateRequest, CategoriesGetByPageRequest } from '~/models/type/Categories/CategoriesRequest';
import { baseGetByPageValidation } from './baseGetByPageValidation';

const categoriesGetByPageValidation: SchemaMap<CategoriesGetByPageRequest> = { ...baseGetByPageValidation };
const categoriesCreateValidation: SchemaMap<CategoriesCreateRequest> = {
    categoryName: Joi.string().required().min(2).max(20).trim()
};

export { categoriesCreateValidation, categoriesGetByPageValidation };

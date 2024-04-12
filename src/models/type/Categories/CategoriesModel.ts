import { baseInfoCreateModel, baseInfoModel, baseInfoUpdateModel } from '../BaseType/BaseModel';

export type CategoriesSchemaModel = {
    categoryName: string;
} & baseInfoModel;

export type CategoriesCreateModel = {
    categoryName: string;
} & baseInfoCreateModel;

export type CategoriesUpdateModel = {
    categoryName: string;
} & baseInfoUpdateModel;

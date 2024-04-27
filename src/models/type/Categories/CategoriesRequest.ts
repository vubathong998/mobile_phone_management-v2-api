import { BaseGetByPageRequest } from '../BaseType/BaseRequest';

export type CategoriesGetByPageRequest = BaseGetByPageRequest;

export type CategoriesCreateRequest = {
    categoryName: string;
};

export type categoriesDeleteRequest = {
    id: string;
};

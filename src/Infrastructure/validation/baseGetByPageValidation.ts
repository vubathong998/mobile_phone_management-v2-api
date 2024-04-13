import Joi, { SchemaMap } from 'joi';
import { BaseGetByPageRequest, FilterOrderByEnum } from '~/models/type/BaseType/BaseRequest';

const baseGetByPageValidation: SchemaMap<BaseGetByPageRequest> = {
    page: Joi.number().required().min(1),
    limit: Joi.number().required().min(1),
    FieldName: Joi.string(),
    keyword: Joi.any(),
    orderBy: Joi.string().valid(...Object.values(FilterOrderByEnum))
};

export { baseGetByPageValidation };

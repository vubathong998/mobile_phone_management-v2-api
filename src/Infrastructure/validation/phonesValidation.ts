import Joi, { SchemaMap } from 'joi';
import {
    PhonesCreateRequest,
    phonesDeleteRequest,
    PhonesGetByPageRequest,
    PhonesUpdateRequest
} from '~/models/type/Phones/PhonesRequest';
import { baseGetByPageValidation } from './baseGetByPageValidation';

const phonesGetByPageValidation: SchemaMap<PhonesGetByPageRequest> = { ...baseGetByPageValidation };

const phonesCreateValidation: SchemaMap<PhonesCreateRequest> = {
    name: Joi.string().required().min(2).max(20).trim(),
    price: Joi.number().required()
};

// const phonesUpdateValidation: SchemaMap<PhonesUpdateRequest> = {};

const phonesDeleteValidation: SchemaMap<phonesDeleteRequest> = {
    id: Joi.string().required().length(24).trim()
};
1;

export {
    phonesGetByPageValidation,
    phonesCreateValidation,
    // phonesUpdateValidation,
    phonesDeleteValidation
};

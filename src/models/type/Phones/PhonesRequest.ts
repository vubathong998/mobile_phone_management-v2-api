import { BaseGetByPageRequest } from '../BaseType/BaseRequest';
import { PhonesModel } from './PhonesModel';

export type PhonesGetByPageRequest = BaseGetByPageRequest;

export type PhonesCreateRequest = PhonesModel;

export type PhonesUpdateRequest = PhonesModel & {
    id: string;
};

export type phonesDeleteRequest = {
    id: string;
};

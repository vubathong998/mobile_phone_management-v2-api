import { STATUS_CODE } from '~/constants/statusCode';

export type BaseResponseModel<T> = {
    code: STATUS_CODE;
    data: T | null;
    message?: string;
};

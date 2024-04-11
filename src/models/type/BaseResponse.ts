import * as express from 'express';
import { STATUS_CODE } from '~/constants/statusCode';

export type BaseResponseSuccessType<T> = {
    data: T;
    res: express.Response;
    req?: express.Request;
    message?: string;
    code?: STATUS_CODE;
    isLog?: boolean;
    customLog?: any;
    getLine?: any;
};

export type BaseResponseErrorType = {
    res: express.Response;
    req?: express.Request;
    message?: string;
    code?: STATUS_CODE;
    customLog?: any;
    getLine?: any;
    catchError?: string | unknown;
};

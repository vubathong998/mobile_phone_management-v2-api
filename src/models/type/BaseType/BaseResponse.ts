import * as express from 'express';
import { STATUS_CODE } from '~/Infrastructure/constants/statusCode';

export type baseResponseSuccessType<T> = {
    data: T;
    res: express.Response;
    req?: express.Request;
    message?: string;
    code?: STATUS_CODE;
    isLog?: boolean;
    customLog?: any;
    getLine?: any;
};

export type baseResponseErrorType = {
    res: express.Response;
    req: express.Request;
    message?: string;
    code?: STATUS_CODE;
    customLog?: any;
    getLine: any;
    catchError?: string | unknown;
};

export type paginationDataResponse<T = any> = {
    page: number;
    limit: number;
    result: T;
    total: number;
};

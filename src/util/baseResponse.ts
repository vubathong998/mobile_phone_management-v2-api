import * as express from 'express';
import { BaseResponseModel } from '~/models/type/BaseModel.js';
import { STATUS_CODE } from '~/constants/statusCode';
import { logger } from '~/loggerConfig';
import { BaseResponseErrorType, BaseResponseSuccessType } from '~/models/type/BaseResponse';
import { stringifyAtCircularCase } from './stringifyAtCircularCase';

const baseResponseSuccess = <T>(param: BaseResponseSuccessType<T>) => {
    const { code, data, res, req, message, isLog, customLog, getLine } = param;
    if (isLog) {
        logger.info(
            JSON.stringify({
                getLine,
                request: {
                    token: req?.headers['authorization'],
                    body: {
                        ...req?.body
                    }
                },
                response: {
                    code,
                    data,
                    message
                },
                customLog
            })
            // stringifyAtCircularCase({
            //     getLine,
            //     request: {
            //         token: req?.headers['authorization'],
            //         body: {
            //             ...req?.body
            //         }
            //     },
            //     response: {
            //         code,
            //         data,
            //         message
            //     },
            //     customLog
            // })
        );
    }
    const response: BaseResponseModel<T> = {
        code: code || STATUS_CODE.Success,
        message,
        data
    };
    res.json(response);
};

const baseResponseError = (param: BaseResponseErrorType) => {
    const { code, message, res, customLog, req, getLine, catchError } = param;
    logger.error(
        JSON.stringify({
            getLine,
            request: {
                body: { ...req?.body },
                token: req?.headers['authorization']
            },
            customLog,
            catchError
        })
        // stringifyAtCircularCase({
        //     getLine,
        //     request: {
        //         body: { ...req?.body },
        //         token: req?.headers['authorization']
        //     },
        //     customLog,
        //     catchError
        // })
    );
    const response: BaseResponseModel<null> = {
        code: code || STATUS_CODE.BadRequest,
        message,
        data: null
    };
    res.json(response);
};

export { baseResponseSuccess, baseResponseError };

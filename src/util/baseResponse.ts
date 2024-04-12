import * as express from 'express';
import { baseResponseModel } from '~/models/type/BaseType/BaseModel.js';
import { STATUS_CODE } from '~/constants/statusCode';
import { logger } from '~/loggerConfig';
import { baseResponseErrorType, baseResponseSuccessType } from '~/models/type/BaseType/BaseResponse';
// import { stringifyAtCircularCase } from './stringifyAtCircularCase';

const baseResponseSuccess = <T>(param: baseResponseSuccessType<T>) => {
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
    const response: baseResponseModel<T> = {
        code: code || STATUS_CODE.Success,
        message: message || STATUS_CODE[code || STATUS_CODE.Success],
        data
    };
    res.json(response);
};

const baseResponseError = (param: baseResponseErrorType) => {
    const { code, message, res, customLog, req, getLine, catchError } = param;
    logger.error(
        JSON.stringify({
            getLine,
            request: {
                body: { ...req?.body },
                token: req?.headers['authorization']
            },
            catchError,
            customLog
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

    const response: baseResponseModel<null> = {
        code: code || STATUS_CODE.BadRequest,
        message: message || STATUS_CODE[code || STATUS_CODE.BadRequest],
        data: null
    };
    res.json(response);
};

export { baseResponseSuccess, baseResponseError };

import * as express from 'express';
import * as core from 'express-serve-static-core';
import { baseResponseError, baseResponseSuccess } from '~/Infrastructure/utilities/baseResponse';
import { createInfo } from '~/Infrastructure/utilities/createInfo';
import { getLine } from '~/Infrastructure/utilities/getLine';
import PhonesSchema from '~/models/schemas/PhonesSchema';
import { BaseGetByPageRequest } from '~/models/type/BaseType/BaseRequest';
import { paginationDataResponse } from '~/models/type/BaseType/BaseResponse';
import { PhonesModel } from '~/models/type/Phones/PhonesModel';
import { PhonesCreateRequest, phonesDeleteRequest, PhonesUpdateRequest } from '~/models/type/Phones/PhonesRequest';

class PhonesController {
    async getByPage(req: express.Request<core.ParamsDictionary, any, BaseGetByPageRequest>, res: express.Response) {
        const { body } = req;

        try {
            let page: number = 1;
            let limit: number = 10;
            let keyword: string = '';

            if (body.page > 0 && body.limit) {
                page = body.page;
                limit = body.limit;
            }
            if (body.keyword) {
                keyword = body.keyword;
            }

            const data = await PhonesSchema.find({ ...req.query, name: new RegExp(keyword, 'i') })
                .limit(Number(limit))
                .skip((page - 1) * limit)
                .sort();

            const total = await PhonesSchema.countDocuments(req.query);

            baseResponseSuccess<paginationDataResponse<any>>({
                data: {
                    limit,
                    page,
                    result: data,
                    total
                },
                req,
                res,
                isLog: true
            });
        } catch (catchError) {
            baseResponseError({
                getLine: getLine(),
                res,
                req,
                catchError
            });
        }
    }
    async create(
        req: express.Request<core.ParamsDictionary, any, PhonesCreateRequest>,
        res: express.Response<PhonesCreateRequest>
    ) {
        try {
            const body: PhonesModel = {
                ...req.body,
                ...createInfo(req.headers)
            };
            PhonesSchema.validate();
            const data = await PhonesSchema.create(body);
            baseResponseSuccess({
                data,
                res
            });
        } catch (catchError) {
            baseResponseError({
                getLine: getLine(),
                req,
                res,
                catchError
            });
        }
    }
    async update(
        req: express.Request<core.ParamsDictionary, any, PhonesUpdateRequest>,
        res: express.Response<PhonesUpdateRequest>
    ) {
        try {
            console.log({ body: req.body });
            const updatedPhone = await PhonesSchema.findByIdAndUpdate(req.body.id, req.body);

            baseResponseSuccess({
                data: updatedPhone,
                res
            });
        } catch (catchError) {
            baseResponseError({
                getLine: getLine(),
                req,
                res,
                catchError
            });
        }
    }
    async delete(req: express.Request<core.ParamsDictionary, any, phonesDeleteRequest>, res: express.Response<any>) {
        try {
            const data = await PhonesSchema.findByIdAndDelete(req.params.id);
            baseResponseSuccess({
                data,
                res: res
            });
        } catch (error) {
            baseResponseError({
                getLine: getLine(),
                req,
                res
            });
        }
    }
}

export default PhonesController;

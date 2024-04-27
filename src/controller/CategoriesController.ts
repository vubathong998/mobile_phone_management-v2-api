import * as express from 'express';
import * as core from 'express-serve-static-core';
import CategoriesSchema from '~/models/schemas/CategoriesSchema';
import { BaseGetByPageRequest } from '~/models/type/BaseType/BaseRequest';
import { baseResponseError, baseResponseSuccess } from '~/Infrastructure/utilities/baseResponse';
import { paginationDataResponse } from '~/models/type/BaseType/BaseResponse';
import { CategoriesCreateRequest, categoriesDeleteRequest } from '~/models/type/Categories/CategoriesRequest';
import { getLine } from '~/Infrastructure/utilities/getLine';
import { CategoriesCreateModel, CategoriesSchemaModel } from '~/models/type/Categories/CategoriesModel';
import { createInfo } from '~/Infrastructure/utilities/createInfo';

class CategoriesController {
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

            const data = await CategoriesSchema.find({ ...req.query, categoryName: new RegExp(keyword, 'i') })
                .limit(Number(limit))
                .skip((page - 1) * limit)
                .sort();

            const total = await CategoriesSchema.countDocuments(req.query);

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
        req: express.Request<core.ParamsDictionary, any, CategoriesCreateRequest>,
        res: express.Response<CategoriesSchemaModel>
    ) {
        try {
            const body: CategoriesCreateModel = {
                ...req.body,
                ...createInfo(req.headers)
            };
            CategoriesSchema.validate();
            const data = await CategoriesSchema.create(body);
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
    async delete(
        req: express.Request<core.ParamsDictionary, any, categoriesDeleteRequest>,
        res: express.Response<any>
    ) {
        try {
            const data = await CategoriesSchema.findByIdAndDelete(req.params.id);
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

export default CategoriesController;

import * as express from 'express';
import * as core from 'express-serve-static-core';
import CategoriesSchema from '../models/schemas/CategoriesSchema';
import jwt from 'jsonwebtoken';
import { BaseGetByPageRequest } from '~/models/type/BaseType/BaseRequest';
import { baseResponseError, baseResponseSuccess } from '~/util/baseResponse';
import { CategoriesResponse } from '~/models/type/Categories/CategoriesResponse';
import { paginationDataResponse } from '~/models/type/BaseType/BaseResponse';
import { CategoriesCreateRequest } from '~/models/type/Categories/CategoriesRequest';
import { STATUS_CODE } from '~/constants/statusCode';
import { checkPermission } from '~/tokenHandler';
import { PERMISSION } from '~/constants/permission';
import { getLine } from '~/util/getLine';
import { CategoriesCreateModel, CategoriesSchemaModel } from '~/models/type/Categories/CategoriesModel';
import { createInfo } from '~/util/createInfo';

class CategoriesController {
    async getByPage(req: express.Request<core.ParamsDictionary, any, BaseGetByPageRequest>, res: express.Response) {
        const { body } = req;

        if (checkPermission(req.headers, PERMISSION.Category)) {
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
        } else {
            baseResponseError({
                getLine: getLine(),
                res,
                req,
                code: STATUS_CODE.NoPermission
            });
        }
    }
    async create(
        req: express.Request<core.ParamsDictionary, any, CategoriesCreateRequest>,
        res: express.Response<CategoriesCreateRequest>
    ) {
        if (checkPermission(req.headers, PERMISSION.CategoryCreate)) {
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
        } else {
            baseResponseError({
                getLine: getLine(),
                req,
                res,
                code: STATUS_CODE.NoPermission
            });
        }
    }
}

export default CategoriesController;

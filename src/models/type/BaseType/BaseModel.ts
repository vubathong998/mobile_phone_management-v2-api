import { STATUS_CODE } from '~/Infrastructure/constants/statusCode';

export type baseResponseModel<T> = {
    code: STATUS_CODE;
    data: T | null;
    message?: string;
};

export type baseInfoModel = {
    createdByName: string;
    createdByDate: Date;
    createdDateUnixTime: number;
    lastEditedDate: Date;
    lastEditedByName: string;
    lastCreatedDateUnixTime: number;
};

export type baseInfoCreateModel = {
    createdByName: string;
    createdByDate: Date;
    createdDateUnixTime: number;
};

export type baseInfoUpdateModel = {
    lastEditedDate: Date;
    lastEditedByName: string;
    lastCreatedDateUnixTime: number;
};

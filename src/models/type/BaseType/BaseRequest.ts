export type BaseGetByPageRequest = {
    keyword?: string;
    orderBy?: FilterOrderByEnum;
    FieldName?: string;
    page: number;
    limit: number;
};
export enum FilterOrderByEnum {
    DESC = 'desc',
    ASC = 'asc'
}

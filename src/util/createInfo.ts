import { baseInfoCreateModel } from '~/models/type/BaseType/BaseModel';
import { getInfoIdentity } from '~/tokenHandler';

export const createInfo = (headers: any): baseInfoCreateModel => {
    return {
        createdByDate: new Date(),
        createdByName: getInfoIdentity(headers, 'email'),
        createdDateUnixTime: Date.now()
    };
};

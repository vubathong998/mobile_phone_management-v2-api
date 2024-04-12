import jwt from 'jsonwebtoken';

export const getInfoIdentity = (headers: any, field: string): string => {
    try {
        const bearerToken = headers['authorization'];
        const token = bearerToken?.split(' ')[1];
        const identity = jwt.decode(token || '') as any;
        return identity.user[field];
    } catch (error) {
        return '';
    }
};

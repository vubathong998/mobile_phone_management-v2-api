import * as core from 'express-serve-static-core';
import routeAccount from './account';
import routeCategories from './categories';
import routePhones from './phones';

export default function router(app: core.Express) {
    app.use('/api/account', routeAccount);
    app.use('/api/category', routeCategories);
    app.use('/api/phone', routePhones);
}

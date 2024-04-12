import * as core from 'express-serve-static-core';
import routeAccount from './account';
import routeCategories from './categories';

export default function router(app: core.Express) {
    app.use('/api/account', routeAccount);
    app.use('/api/category', routeCategories);
}

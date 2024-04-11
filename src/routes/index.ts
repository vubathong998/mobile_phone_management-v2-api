import * as core from 'express-serve-static-core';
import routeAccount from './account';

export default function router(app: core.Express) {
    app.use('/api/account', routeAccount);
}

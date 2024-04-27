import { logger } from './loggerConfig';
import bodyParser from 'body-parser';
import express from 'express';
import connectMongoDB from './connectMongoose';
import 'dotenv/config';
import router from './routes';

const app = express();
const port = process.env.PORT || 6001;

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_React_URL || '');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const uri = process.env.MONGO_DB || '';
connectMongoDB(uri);

router(app);

app.listen(port, () => {
    logger.info('server is started');
});

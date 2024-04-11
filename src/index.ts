import { logger } from './loggerConfig';
import bodyParser from 'body-parser';
import express from 'express';
import connectMongoDB from './connect';
import 'dotenv/config';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const uri = process.env.MONGO_DB || '';
connectMongoDB(uri);

router(app);

app.listen(port, () => {
    logger.info('server is started');
});

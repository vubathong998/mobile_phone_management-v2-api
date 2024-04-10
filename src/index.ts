import bodyParser from 'body-parser';
import express from 'express';
import connectMongoDB from './connect';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const uri = process.env.MONGO_DB || '';
connectMongoDB(uri);

app.listen(port, () => {
    console.log('server is started');
});

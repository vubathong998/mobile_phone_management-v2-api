import { logger } from './loggerConfig';
import mongoose from 'mongoose';

const connectMongoDB = async (uri: string) => {
    try {
        await mongoose.connect(uri);
        logger.info('mongoose is connected');
    } catch (error) {
        logger.error(`connectMongoDB:
        uri: {uri}
        catch: ${error}`);
    }
};

export default connectMongoDB;

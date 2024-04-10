import mongoose from 'mongoose';

const connectMongoDB = async (uri: string) => {
    try {
        await mongoose.connect(uri);
        console.log('mongoose is connected');
    } catch (error) {
        console.log(error);
    }
};

export default connectMongoDB;

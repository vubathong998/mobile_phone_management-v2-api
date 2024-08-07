import mongoose from 'mongoose';
import { BaseSchema } from './BaseSchema';
import { PhonesCreateRequest } from '../type/Phones/PhonesRequest';

const { Schema } = mongoose;

const PhonesSchema = new Schema<PhonesCreateRequest>({
    name: {
        type: String,
        require: true,
        unique: true
    },
    categoryId: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    memory: {
        type: Number,
        require: true
    },
    productStatus: {
        type: String,
        require: true
    },
    frontCamera: {
        type: String,
        require: true
    },
    rearCamera: {
        type: String,
        require: true
    },
    ram: {
        type: Number,
        require: true
    },
    rom: {
        type: Number,
        require: true
    },
    numberOfSim: {
        type: Number,
        require: true
    },
    isMemoryCardSupport: {
        type: Boolean,
        require: true
    },
    batteryCapacity: {
        type: Number,
        require: true
    },
    quickCharge: {
        type: Number,
        require: true
    },
    waterResistance: {
        type: String,
        require: true
    }
});

PhonesSchema.add(BaseSchema);

export default mongoose.model('Phones', PhonesSchema);

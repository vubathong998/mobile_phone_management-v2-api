import mongoose from 'mongoose';
import { CategoriesSchemaModel } from '../type/Categories/CategoriesModel';
import { baseInfoCreateModel, baseInfoModel, baseInfoUpdateModel } from '../type/BaseType/BaseModel';
// import { BaseSchema } from './BaseModel';

const { Schema } = mongoose;

const BaseSchema = new Schema({
    createdByDate: {
        type: Date
    },
    createdByName: {
        type: String
    },
    createdDateUnixTime: {
        type: Number
    },
    lastCreatedDateUnixTime: {
        type: Number
    },
    lastEditedByName: {
        type: String
    },
    lastEditedDate: {
        type: Date
    }
});

// const BaseCreateSchema = new Schema<baseInfoCreateModel>({
//     createdByDate: {
//         type: Date,
//         required: true
//     },
//     createdByName: {
//         type: String,
//         required: true
//     },
//     createdDateUnixTime: {
//         type: Number,
//         required: true
//     }
// });

// const BaseUpdateSchema = new Schema<baseInfoUpdateModel>({
//     lastCreatedDateUnixTime: {
//         type: Number,
//         required: true
//     },
//     lastEditedByName: {
//         type: String,
//         required: true
//     },
//     lastEditedDate: {
//         type: Date,
//         required: true
//     }
// });

export { BaseSchema };

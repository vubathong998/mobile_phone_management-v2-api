import mongoose from 'mongoose';
import { AccountSchemaModel } from '../type/Account/AccountModel';

const accountSchema = new mongoose.Schema<AccountSchemaModel>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    permission: {
        type: String
    },
    avatar: {
        type: String
    }
});

export default mongoose.model('Account', accountSchema);

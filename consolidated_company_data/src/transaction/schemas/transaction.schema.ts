import { Schema } from 'mongoose'
import * as uuid from "uuid";

export const TransactionSchema = new Schema({
    company_name: String,
    uuid: {
        type: String,
        default: uuid.v4()
    },
    price: Number,
    createAt: {
        type: Date,
        default: Date.now
    }
});
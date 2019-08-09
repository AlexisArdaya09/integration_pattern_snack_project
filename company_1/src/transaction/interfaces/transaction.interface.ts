import { Document } from 'mongoose'

export interface Transaction extends Document {
    readonly company_name: string;
    readonly uuid: string;
    readonly price: number;
    readonly createAt: Date;
}
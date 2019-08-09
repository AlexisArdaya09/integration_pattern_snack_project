import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionDTO } from './dto/transaction.dto';
import { ObjectId } from 'bson';


@Injectable()
export class TransactionsService {

    constructor(
        @InjectModel('Transaction') private TransactionModel: Model<Transaction>,
    ) { }

    async getTransactionByUUID(uuid: string): Promise<Transaction[]> {
        try {
            const transactionsByUser: any[] = await this.TransactionModel.find({ uuid: uuid });
            return transactionsByUser;

        } catch (err) { console.log(err) }

    }
}

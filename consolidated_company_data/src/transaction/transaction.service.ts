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

    async getTransactions(): Promise<Transaction[]> {
        const Transactions = await this.TransactionModel.find();
        return Transactions;
    }

    async getTransaction(TransactionID: string): Promise<Transaction> {
        let TransactionIDObject = new ObjectId(TransactionID);
        const Transaction = await this.TransactionModel.findById(TransactionIDObject);
        return Transaction;
    }

    async createTransaction(createTransactionDTO: CreateTransactionDTO): Promise<Transaction> {
        const Transaction = await new this.TransactionModel(createTransactionDTO);
        return await Transaction.save();
    }

    async updateTransaction(TransactionID: string, createTransactionDTO: CreateTransactionDTO): Promise<Transaction> {
        const updatedTransaction = await this.TransactionModel.findOneAndUpdate(TransactionID, createTransactionDTO, { new: true })
        return updatedTransaction;

    }

    async deleteTransaction(TransactionID: string): Promise<Transaction> {
        let TransactionIDObject = new ObjectId(TransactionID);
        const deleteTransaction = await this.TransactionModel.findByIdAndDelete(TransactionIDObject);
        return deleteTransaction;
    }


    async getTransactionByUUID(uuid: string): Promise<Transaction[]> {
        try {
            const transactionsByUser: any[] = await this.TransactionModel.find({ uuid: uuid });
            return transactionsByUser;  

        } catch (err) { console.log(err) }

    }
}

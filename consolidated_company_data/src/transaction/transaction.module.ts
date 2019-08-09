import { Module } from '@nestjs/common';
import { TransactionsController } from './transaction.controller';
import { TransactionsService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
   ],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule { }
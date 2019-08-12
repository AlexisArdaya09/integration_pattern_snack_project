import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/transaction.dto'
import { TransactionsService } from './transaction.service'
import { RMQController, RMQRoute } from 'rabbitmq-messages';

@Controller('transaction')
export class TransactionsController extends RMQController {
    constructor(private transactionsService: TransactionsService) {
        super({
            exchangeName: 'snack_team',
            connections: [ 
                {
                    login: 'admin',
                    password: 'Password123',
                    host: '159.65.220.217:5672',
                },
            ],
            queueName: 'transaction_by_user_2'
        }); 
    }

    @Post("/create")
    async createPost(@Res() res, @Body() createTransactionDTO: CreateTransactionDTO) {
        const transaction = await this.transactionsService.createTransaction(createTransactionDTO)
        return res.status(HttpStatus.OK).json({
            message: 'Transaction Successfully Created',
            Transaction: transaction
        })
    }

    @Get('/')
    async getTransactions(@Res() res) {
        const Transactions = await this.transactionsService.getTransactions()
        res.status(HttpStatus.OK).json({
            Transactions
        })
    }

    
    @Get('/:uuid')
    async getTransactionsByUUID(@Res() res, @Param('uuid') uuid) {
        try {  
            const Transaction = await this.transactionsService.getTransactionByUUID(uuid);
            if (!Transaction) throw new NotFoundException('Transactions does not exists');
            return res.status(HttpStatus.OK).json(Transaction);
        } catch (err) {
            console.log(err)  
        } 
    } 

    @RMQRoute('company___2')
    async getTransactionByUUID(uuid: string) {
        console.log("company_2")
        let data:any;
        const transactions = await this.transactionsService.getTransactionByUUID(uuid);
        return transactions.length > 0 ? transactions : "Not found"
    }

    @Delete('/')
    async deleleTransaction(@Res() res, @Query('TransactionID') TransactionID) {
        const TransactionDeleted = await this.transactionsService.deleteTransaction(TransactionID)
        if (!TransactionDeleted) throw new NotFoundException('Transaction does not exists');
        return res.status(HttpStatus.OK).json({
            message: "Transaction deleted succesful",
            TransactionDeleted
        })
    }

    @Put('/')
    async updateTransaction(@Res() res, @Body() createTransactionDTO: CreateTransactionDTO, @Query('TransactionID') TransactionID) {
        const TransactionUpdated = await this.transactionsService.updateTransaction(TransactionID, createTransactionDTO)
        if (!TransactionUpdated) throw new NotFoundException('Transaction does not exists');
        return res.status(HttpStatus.OK).json({
            message: "Transaction updated succesful",
            TransactionUpdated
        })
    }
}

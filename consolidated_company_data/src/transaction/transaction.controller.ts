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
            queueName: 'transaction_by_user',prefetchCount:1
        });
    }
    
    @Get('/:uuid')
    async getTransactionsByUUID(@Res() res, @Param('uuid') uuid) {
        try {
            let data = [];
            let responseVerify= [];
            this.send<string, string>("company___1", uuid).then(reply => {
                this.responseData(reply,data,responseVerify)  
            }).catch(function (err) { 
                console.log("Fallo", err); 
            });
            this.send<string, string>("company___2", uuid).then(reply => {
                this.responseData(reply,data,responseVerify)  
            }).catch(function (err) { 
                console.log("Fallo", err); 
            });
            this.send<string, string>("main___company", uuid).then(reply => {
                this.responseData(reply,data,responseVerify)  
            }).catch(function (err) { 
                console.log("Fallo", err); 
            });
            
            setTimeout(function() {
                console.log(data)
            }, 5000);
        
            const msg = "Message request data sent successfully"
            console.log(msg)
            return res.status(HttpStatus.OK).json({msg});
        } catch (err) {
            console.log(err)
        }
    }

    responseData(reply, data, responseVerify){
        if (reply != "Not found"){
            data.push(reply)
            responseVerify.push(true)
        }
    }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transaction/transaction.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    TransactionsModule,
    MongooseModule.forRoot('mongodb+srv://liyi:123@cluster0-igjwe.mongodb.net/Company_1?retryWrites=true&w=majority', {
      useNewUrlParser: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

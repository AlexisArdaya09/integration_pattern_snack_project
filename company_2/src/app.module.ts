import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transaction/transaction.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    TransactionsModule,
    MongooseModule.forRoot('mongodb+srv://gabs:123@cluster0-voanl.gcp.mongodb.net/Company_2?retryWrites=true&w=majority', {
      useNewUrlParser: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

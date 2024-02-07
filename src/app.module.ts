import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from './log/log.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    LogModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_DNS}`,
      {dbName : "db-chappy-log"}
    )
  ]})
export class AppModule {}

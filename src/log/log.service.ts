import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './schemas/log.schema';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Injectable()
export class LogService {

    constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

      async getLogsByRef(refModel: number, refId: string): Promise<Log[]> {
        try {
            return await this.logModel.find<Log>({model:{refModel, refId}})
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
      }
    
      async getOneById(_id: string): Promise<Log> {
        try {
            return await this.logModel.findById<Log>(_id).exec()
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
      }
    
      async create(createLogDto: CreateLogDto): Promise<Log> {
        try {
            return await this.logModel.create(createLogDto)
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        } 
      }

      async update<Log>(_id: string, logDto:UpdateLogDto): Promise<Log> {
        try {
            return await this.logModel.findByIdAndUpdate<Log>(_id, logDto, {new: true});
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
          
      }
    
      async deleteOne(_id: string) {
        try {
            return await this.logModel.deleteOne({_id})
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
      }

      async deleteMany(options: {}) {
        try {
            return await this.logModel.deleteMany(options)
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
      }
}

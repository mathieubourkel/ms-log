import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './schemas/log.schema';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { BaseUtils } from 'libs/base/base.utils';

@Injectable()
export class LogService extends BaseUtils {

    constructor(@InjectModel(Log.name) private logModel: Model<Log>) {
      super()
    }

      async getLogsBySearchOptions(searchOptions:{}): Promise<Log[]> {
        try {
            return await this.logModel.find<Log>(searchOptions)
        } catch (error) {
            this._catchEx(error)
        }
      }
    
      async getOneById(_id: string): Promise<Log> {
        try {
            return await this.logModel.findById<Log>(_id).exec()
        } catch (error) {
          this._catchEx(error)
        }
      }
    
      async create(createLogDto: CreateLogDto): Promise<Log> {
        try {
            return await this.logModel.create(createLogDto)
        } catch (error) {
            this._catchEx(error)
        } 
      }

      async update<Log>(_id: string, logDto:UpdateLogDto): Promise<Log> {
        try {
            return await this.logModel.findByIdAndUpdate<Log>(_id, logDto, {new: true});
        } catch (error) {
          this._catchEx(error)
        }
          
      }
    
      async deleteOne(_id: string) {
        try {
            return await this.logModel.deleteOne({_id})
        } catch (error) {
          this._catchEx(error)
        }
      }

      async deleteMany(options: {}) {
        try {
            return await this.logModel.deleteMany(options)
        } catch (error) {
          this._catchEx(error)
        }
      }
}

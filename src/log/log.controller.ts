import { Controller, ValidationPipe } from '@nestjs/common';
import { ModelEnum } from '../enums/model.enum';
import { UpdateLogDto } from './dto/update-log.dto';
import { LogService } from './log.service';
import { Log } from './schemas/log.schema';
import { BaseUtils } from 'libs/base/base.utils';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateLogDto } from './dto/create-log.dto';

@Controller()
export class LogController extends BaseUtils {

    constructor(private readonly logService: LogService) {
        super()
    }

    @MessagePattern('GET_LOGS')
    async getLogsByIdRefModel(@Payload() params:any):Promise<Log[]>{
        try {
            const result = await this.logService.getLogsByRef(ModelEnum[`${params.refModel}`], params.refId)
            if (!result) this._Ex("BAD REQUEST", 400, "MS-LOG-CTRL-GET-LOGS")
            return result;
        } catch (error) {
            this._catchEx(error)
        }
    }

    @EventPattern('ADD_LOG')
    create(@Payload(new ValidationPipe()) createLogDto:CreateLogDto):void {
        this.logService.create(createLogDto)
    }

    @MessagePattern('MODIFY_STATUS_LOG')
    async update<Log>(@Payload(new ValidationPipe()) updateLogDto:UpdateLogDto):Promise<Log>{
        try {
            return await this.logService.update<Log>(updateLogDto._id, updateLogDto)
        } catch (error) {
            this._catchEx(error)
        }
    }

    @MessagePattern('DELETE_MANY_LOGS_BY_DATE')
    async deleteManyByFilter(@Payload() date:Date):Promise<unknown>{
        try {
            return await this.logService.deleteMany({expiryAt : {$lte: date}})
        } catch (error) {
            this._catchEx(error)
        }
    }

    @MessagePattern('DELETE_LOG')
    async delete(@Payload() id:string):Promise<unknown>{
        try {
            return await this.logService.deleteOne(id)
        } catch (error) {
            this._catchEx(error)
        }
    }
}
import { Controller, NotFoundException, ValidationPipe } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ModelEnum } from './enums/model.enum';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { LogService } from './log.service';
import { Log } from './schemas/log.schema';
import { BaseUtils } from 'libs/base/base.utils';
import { ClientProxy, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class LogController extends BaseUtils {

    constructor(private readonly logService: LogService,
        private readonly client: ClientProxy) {
        super()
    }

    @MessagePattern('GET_LOGS')
    async getLogsByIdRefModel(@Payload() params:{refModel: string, refId: string}):Promise<Log[]>{
        try {
            const result = await this.logService.getLogsByRef(ModelEnum[`${params.refModel}`], params.refId)
            if (!result) throw new NotFoundException()
            return result;
        } catch (error) {
            this._catchEx(error)
        }
    }

    @EventPattern('ADD_LOG')
    create(@Payload() data:any) {
            try {
                return this.logService.create(data)
            } catch (error) {
                this._catchEx(error)
            }
        }

    @MessagePattern('MODIFY_STATUS_LOG')
    update(@Payload('id') id:string, 
            @Payload('body', new ValidationPipe()) log:UpdateLogDto):Observable<{}>{
        try {
            return of (this.logService.update<Log>(id, log))
        } catch (error) {
            this._catchEx(error)
        }
    }

    @MessagePattern('DELETE_MANY_LOGS')
    deleteMany(@Payload() body:any):Observable<{}>{
        try {
            // const threeMonthsAgo = new Date();
            // threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            return of (this.logService.deleteMany({expiryAt : {$lte: body.date}}))
        } catch (error) {
            this._catchEx(error)
        }
    }

    @MessagePattern('DELETE_LOG')
    delete(@Payload() id:string):Observable<{}>{
        try {
            return of (this.logService.deleteOne(id))
        } catch (error) {
            this._catchEx(error)
        }
    }

    
}
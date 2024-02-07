import { BadRequestException, Body, Controller, Delete, Get, HttpException, InternalServerErrorException, Next, NotFoundException, Param, Post, Put, Req, ValidationPipe } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ModelEnum } from './enums/model.enum';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { LogService } from './log.service';
import { Log } from './schemas/log.schema';

@Controller('log')
export class LogController {

    constructor(private readonly logService: LogService) {}

    @Get(`:refModel/:refId`)
    async getPurchasesByIdRefModel(@Param() params:{refModel: string, refId: string}):Promise<Log[]>{
        try {
            const result = await this.logService.getLogsByRef(ModelEnum[`${params.refModel}`], params.refId)
            if (!result) throw new NotFoundException()
            return result;
        } catch (error) {
          throw new InternalServerErrorException()
        }
  }

    @Post()
    create(
        @Body(new ValidationPipe()) createLog:CreateLogDto) {
            try {
                return this.logService.create(createLog)
            } catch (error) {
                throw new InternalServerErrorException()
            }
        }

    @Put(':id')
    update(@Param('id') id:string, @Body(new ValidationPipe()) log:UpdateLogDto):Observable<{}>{
        try {
            return of (this.logService.update<Log>(id, log))
        } catch (error) {
            throw new BadRequestException()
        }
    }

    @Delete('clean')
    deleteMany():Observable<{}>{
        try {
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            return of (this.logService.deleteMany({expiryAt : {$lte: threeMonthsAgo}}))
        } catch (error) {
            throw new BadRequestException()
        }
    }

    @Delete(':id')
    delete(@Param('id') id:string):Observable<{}>{
        try {
            return of (this.logService.deleteOne(id))
        } catch (error) {
            throw new BadRequestException()
        }
    }

    
}
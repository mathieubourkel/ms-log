import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose';
import { ModelSchema } from "./model.schema";
import { StatusEnum } from "../enums/status.enum";
import { PriorityEnum } from "../enums/priority.enum";
import { SeverityEnum } from "../enums/severity.enum";

export type LogDocument = HydratedDocument<Log>

@Schema({collection: "log", timestamps: true})
export class Log {

    @Prop({type: ModelSchema, required: true})
    model: ModelSchema

    @Prop({required:true})
    message: string

    @Prop({required: true})
    status: StatusEnum

    @Prop()
    content: string

    @Prop()
    author: string   // objectId MS-AUTH
    
    @Prop()
    priority: PriorityEnum

    @Prop()
    severity: SeverityEnum

    @Prop()
    expiryAt: Date

}

export const LogSchema = SchemaFactory.createForClass(Log)
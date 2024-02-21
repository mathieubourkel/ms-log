import { Prop } from "@nestjs/mongoose"
import { ModelEnum } from "../../enums/model.enum"

export class ModelSchema {

    @Prop({required: true})
    refModel:ModelEnum

    @Prop({required:true})
    refId: string
    
}
import { IsInt, IsString, Max } from "class-validator";

export class ModelDto {
    
    @IsInt()
    @Max(10)
    refModel: number
    @IsString()
    refId: string
}


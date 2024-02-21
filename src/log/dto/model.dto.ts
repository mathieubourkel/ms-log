import { IsInt, IsString, Length, Max } from "class-validator";

export class ModelDto {
    @IsInt()
    @Max(10)
    refModel: number
    @IsString()
    @Length(1, 250)
    refId: string
}


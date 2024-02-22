import { IsDateString, IsInt, IsOptional, IsString, Length, Max, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ModelDto } from "./model.dto";

export class CreateLogDto {

    @ValidateNested()
    @Type(() => ModelDto)
    model: ModelDto

    @IsString()
    @Length(1, 150)
    message:string;

    @IsInt()
    @Max(3)
    status:number;

    @IsOptional()
    @IsString()
    @Length(1, 150)
    content:string;

    @IsOptional()
    @IsInt()
    @Max(3)
    priority:number;

    @IsOptional()
    @IsInt()
    @Max(3)
    severity:number;

    @IsOptional()
    @IsDateString()
    expiryAt:string;
}



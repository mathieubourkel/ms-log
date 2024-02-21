import { IsInt, IsString, Max } from "class-validator";
import { StatusEnum } from "../../enums/status.enum";

export class UpdateLogDto {
    @IsString()
    _id: string
    @IsInt()
    @Max(3)
    status: StatusEnum
}

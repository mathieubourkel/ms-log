import { IsInt, Max } from "class-validator";
import { StatusEnum } from "../enums/status.enum";

export class UpdateLogDto {
    @IsInt()
    @Max(3)
    status: StatusEnum
}

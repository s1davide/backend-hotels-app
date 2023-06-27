import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateContactDto {
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly mail: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly phone: string;
}

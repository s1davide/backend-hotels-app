import { ApiProperty } from "@nestjs/swagger"
import {Contacts} from "@prisma/client"
export class Contact implements Contacts{
    @ApiProperty({required:true})
    name: string;

    @ApiProperty({required:true})
    mail: string;

    @ApiProperty({required:true})
    phone: string;

}

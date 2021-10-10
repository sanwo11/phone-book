import { ApiProperty } from '@nestjs/swagger';

export class QueryEntities {
    @ApiProperty({
        type: Number,
    })
    readonly page : number

    @ApiProperty({
        type: Number,
    })
    readonly perpage: number

    @ApiProperty({
        type: String,
    })
    readonly search?: string

    @ApiProperty({
        type: Date,
    })
    readonly from?: string

    @ApiProperty({
        type: Date,
    })
    readonly to?: string
}
export interface QueryEntities1{
    readonly page : number
    readonly perpage: number
    readonly search?: string
    readonly from?: string
    readonly to?: string
}

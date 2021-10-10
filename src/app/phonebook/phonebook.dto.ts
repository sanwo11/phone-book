import { ApiParam, ApiProperty } from '@nestjs/swagger';

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
        required: false,
        type: String,
    })
    readonly search?: string

    @ApiProperty({
        required: false,
        type: Date,
    })
    readonly from?: string

    @ApiProperty({
        required: false,
        type: Date,
    })
    readonly to?: string
}


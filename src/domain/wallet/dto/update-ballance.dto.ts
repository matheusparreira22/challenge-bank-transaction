import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateBallanceDto {

    @ApiProperty({
        example: 100.50,
        description: 'The amount to transfer',
        minimum: 0.01,
    })
    @IsNumber()
    @IsNotEmpty()
    ballance: number;
}

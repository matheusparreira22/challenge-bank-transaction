import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferDto {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'The ID of the user receiving the transfer',
    })
    @IsUUID()
    @IsNotEmpty()
    receiverId: string;

    @ApiProperty({
        example: 100.50,
        description: 'The amount to transfer',
        minimum: 0.01,
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}

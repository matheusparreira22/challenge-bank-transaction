import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateTransferDto {
    @IsUUID()
    @IsNotEmpty()
    receiverId: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}
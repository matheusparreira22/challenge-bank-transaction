import { IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateWalletDto {
  @IsNumber()
  @IsNotEmpty()
  ballance?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

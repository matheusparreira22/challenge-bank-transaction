import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletEntity } from "./entity";
import { WalletController } from "./controller";
import { WalletService } from "./usecase";
import { UserEntity } from "../user/entity";
import { TransferEntity } from "../transfer/entity";

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity, UserEntity, TransferEntity])],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}

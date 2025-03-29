import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransferEntity } from "./entity/transfer.entity";
import { TransferController } from "./controller/transfer.controller";
import { AuthExternalService, TransferService } from "./usecase";
import { UserEntity } from "../user/entity";
import { WalletEntity } from "../wallet/entity";
import { WalletService } from "../wallet/usecase";
import { HttpModule } from '@nestjs/axios';
import { EmailService } from "../email/email.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([TransferEntity, UserEntity, WalletEntity]),
    HttpModule
  ],
  controllers: [TransferController],
  providers: [TransferService, WalletService, AuthExternalService, EmailService],
  exports: [TransferService, HttpModule, AuthExternalService],
})
export class TransferModule {}

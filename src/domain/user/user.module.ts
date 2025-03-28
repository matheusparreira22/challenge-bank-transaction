import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/domain/user/entity";
import { UserController } from "./controller";
import { UserService } from "./usecase";
import { WalletService } from "../wallet/usecase";
import { WalletEntity } from "../wallet/entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WalletEntity])],
  controllers: [UserController],
  providers: [UserService, WalletService],
  exports: [UserService],
})
export class UserModule {}
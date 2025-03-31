import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { TransferEntity } from 'src/domain/transfer/entity/transfer.entity';
import { UserEntity } from 'src/domain/user/entity';
import { WalletEntity } from 'src/domain/wallet/entity';
import { CreateTransferDto } from 'src/domain/transfer/dto/create-transfer.dto';
import { AuthExternalService } from './auth-external.service';
import { EmailService } from 'src/domain/email/email.service';
import { Money } from 'src/domain/transfer/helper/classes';
import { ReturnTransferDto } from '../dto/return-transfer.dto';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(TransferEntity)
    private transferRepository: Repository<TransferEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    private readonly authExternalService: AuthExternalService,
    private emailService: EmailService,
    private dataSource: DataSource,
  ) {}

  private async validateTransfer(
    sender: UserEntity,
    receiver: UserEntity,
    amount: number,
  ): Promise<void> {
    if (!sender || !receiver) {
      throw new NotFoundException('Sender or receiver not found');
    }

    if (amount <= 0) {
      throw new BadRequestException('Invalid transfer amount');
    }

    if (sender.isLojist) {
      throw new BadRequestException('Shopkeeper users cannot send money');
    }

    if (!sender.wallet || !receiver.wallet) {
      throw new BadRequestException('Both users must have active wallets');
    }

    if (!sender.wallet.isActive || !receiver.wallet.isActive) {
      throw new BadRequestException('Both wallets must be active');
    }

    if (sender.wallet.ballance < amount) {
      throw new BadRequestException('Insufficient funds');
    }
  }

  async createTransfer(
    senderId: string,
    dto: CreateTransferDto,
  ): Promise<ReturnTransferDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const sender = await this.userRepository.findOne({
        where: { id: senderId },
        relations: ['wallet'],
      });

      const receiver = await this.userRepository.findOne({
        where: { id: dto.receiverId },
        relations: ['wallet'],
      });

      await this.validateTransfer(sender, receiver, dto.amount);

      const authorized =
        await this.authExternalService.validateAuthentication();

      // console.log(new Money(dto.amount).add(50.2).value);

      const transfer = this.transferRepository.create({
        sender: sender.wallet,
        receiver: receiver.wallet,
        amount: new Money(dto.amount).value,
        authorized,
      });

      if (authorized) {
        const senderWallet = await queryRunner.manager.findOne(WalletEntity, {
          where: { id: sender.wallet.id },
          lock: { mode: 'pessimistic_write' },
        });
        senderWallet.ballance = new Money(senderWallet.ballance).subtraction(
          dto.amount,
        ).value;

        await queryRunner.manager.save(WalletEntity, senderWallet);

        const receiverWallet = await queryRunner.manager.findOne(WalletEntity, {
          where: { id: receiver.wallet.id },
          lock: { mode: 'pessimistic_write' },
        });
        receiverWallet.ballance = new Money(receiverWallet.ballance).add(
          dto.amount,
        ).value;
        await queryRunner.manager.save(WalletEntity, receiverWallet);

        const savedTransfer = await queryRunner.manager.save(
          TransferEntity,
          transfer,
        );

        await this.emailService.sendEmail(
          sender.email.toString(),
          'Transfer Authorization',
          'Your transfer was not authorized',
        );
        await queryRunner.commitTransaction();

        // Mapeando para ReturnTransferDto com informações limitadas
        const returnDto: ReturnTransferDto = {
          id: savedTransfer.id,
          sender: {
            id: sender.wallet.id,
            ballance: sender.wallet.ballance,
          },
          amount: savedTransfer.amount,
          authorized: savedTransfer.authorized,
          createdAt: savedTransfer.createdAt,
        };


        return returnDto;
      } else {
        const savedTransfer = await queryRunner.manager.save(
          TransferEntity,
          transfer,
        );
        await queryRunner.commitTransaction();

        // Mesmo mapeamento para transferências não autorizadas
        const returnDto: ReturnTransferDto = {
          id: savedTransfer.id,
          sender: {
            id: sender.wallet.id,
            ballance: sender.wallet.ballance,
          },
          amount: savedTransfer.amount,
          authorized: savedTransfer.authorized,
          createdAt: savedTransfer.createdAt,
        };

        return returnDto;
      }
    } catch (error) {
      // Em caso de erro, fazer rollback
      if (queryRunner.isTransactionActive) {
        console.log('ROLLBACK');
        await queryRunner.rollbackTransaction();
      }
      console.log (error);
      // await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        `Failed to process transfer: ${error.message}`,
      );
      
    } finally {
      // Liberar o queryRunner
      await queryRunner.release();
    }
  }
}

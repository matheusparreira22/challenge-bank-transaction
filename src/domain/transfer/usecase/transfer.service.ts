import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferEntity } from 'src/domain/transfer/entity/transfer.entity';
import { UserEntity } from 'src/domain/user/entity';
import { WalletService } from 'src/domain/wallet/usecase';
import { CreateTransferDto } from 'src/domain/transfer/dto/create-transfer.dto';
import { AuthExternalService } from './auth-external.service';

@Injectable()
export class TransferService {
    constructor(
        @InjectRepository(TransferEntity)
        private transferRepository: Repository<TransferEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,

        private readonly authExternalService: AuthExternalService,
        private walletService: WalletService,
    ) {}

    private async validateTransfer(
        sender: UserEntity,
        receiver: UserEntity,
        amount: number
    ): Promise<void> {
        if (!sender || !receiver) {
            throw new NotFoundException('Sender or receiver not found');
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

    // async simulateTransfer( 
    //     senderId: string,
    //     dto: CreateTransferDto
    // ): Promise<{ success: boolean, message: string }> {
    //     try {
    //         const sender = await this.userRepository.findOne({
    //             where: { id: senderId },
    //             relations: ['wallet']
    //         });
            
    //         const receiver = await this.userRepository.findOne({
    //             where: { id: dto.receiverId },
    //             relations: ['wallet']
    //         });

    //         await this.validateTransfer(sender, receiver, dto.amount);
            
    //         return {
    //             success: true,
    //             message: 'Transfer simulation successful'
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             message: error.message
    //         };
    //     }
    // }

    async createTransfer(
        senderId: string,
        dto: CreateTransferDto
    ): Promise<TransferEntity> {
        const sender = await this.userRepository.findOne({
            where: { id: senderId },
            relations: ['wallet']
        });
        
        const receiver = await this.userRepository.findOne({
            where: { id: dto.receiverId },
            relations: ['wallet']
        });

        await this.validateTransfer(sender, receiver, dto.amount);


        await this.walletService.updateBalance(
            sender.wallet.id,
            sender.wallet.ballance - dto.amount
        );

        await this.walletService.updateBalance(
            receiver.wallet.id,
            receiver.wallet.ballance + dto.amount
        );


        const transfer = this.transferRepository.create({
            sender,
            receiver,
            amount: dto.amount
        });

        const authorized = await this.transferRepository.save(transfer);

        if (!authorized) {


            await this.walletService.updateBalance(
                sender.wallet.id,
                sender.wallet.ballance + dto.amount
            );

            await this.walletService.updateBalance(
                receiver.wallet.id,
                receiver.wallet.ballance - dto.amount
            );

            
            throw new Error('Transfer not authorized');
        }

        return this.transferRepository.save(transfer);
    }
}
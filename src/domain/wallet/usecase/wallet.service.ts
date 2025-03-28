import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletEntity } from '../entity/wallet.entity';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(WalletEntity)
        private walletRepository: Repository<WalletEntity>
    ) {}

    async updateBalance(id: string, ballance: number): Promise<WalletEntity> {
        const wallet = await this.walletRepository.findOne({
            where: { id }
        });

        if (!wallet) {
            throw new NotFoundException('Wallet not found');
        }

        if (!wallet.isActive) {
            throw new Error('Cannot update balance of inactive wallet');
        }

        wallet.ballance = ballance;
        wallet.updatedAt = new Date();

        return this.walletRepository.save(wallet);
    }

    async updateStatus(id: string, isActive: boolean): Promise<WalletEntity> {
        const wallet = await this.walletRepository.findOne({
            where: { id }
        });

        if (!wallet) {
            throw new NotFoundException('Wallet not found');
        }

        wallet.isActive = isActive;
        wallet.updatedAt = new Date();

        return this.walletRepository.save(wallet);
    }
}
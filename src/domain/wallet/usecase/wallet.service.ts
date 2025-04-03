import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletEntity } from '../entity/wallet.entity';
import { UserEntity } from 'src/domain/user/entity';
import {Money} from 'src/domain/wallet/helper/classes';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

  
  ) {}

  async create(idUser: string): Promise<WalletEntity> {
    const user = await this.userRepository.findOne({
      where: { id: idUser },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const walletExists = await this.walletRepository.findOne({
      where: { user: { id: idUser } },
      relations: ['user'],
    });



    if (walletExists) {
       throw new BadRequestException('Wallet already exists for this user');
    }

    const wallet = this.walletRepository.create({
      user,
    });
    return await this.walletRepository.save(wallet);
  }

  async updateBalance(id: string, ballance: number): Promise<WalletEntity> {
    const wallet = await this.walletRepository.findOne({
      where: { id },
    });

    ballance = new Money(ballance).value;

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
      where: { id },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    wallet.isActive = isActive;
    wallet.updatedAt = new Date();

    return this.walletRepository.save(wallet);
  }
}

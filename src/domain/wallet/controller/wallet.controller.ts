import { Body, Controller, Param, Patch } from '@nestjs/common';
import { WalletService } from 'src/domain/wallet/usecase/wallet.service';
import { UpdateWalletDto } from '../dto';

@Controller('wallet')
export class WalletController {
    constructor(
        private walletService: WalletService
    ) {}

    @Patch(':id/balance')
    async updateBalance(
        @Param('id') id: string,
        @Body('ballance') ballance: number
    ) {
        return this.walletService.updateBalance(id, ballance);
    }

    @Patch(':id/status')
    async updateStatus(
        @Param('id') id: string,
        @Body('isActive') isActive: boolean
    ) {
        return this.walletService.updateStatus(id, isActive);
    }
}
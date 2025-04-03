import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { WalletService } from 'src/domain/wallet/usecase/wallet.service';
import { UpdateBallanceDto } from 'src/domain/wallet/dto/update-ballance.dto';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post(':iduser')
  async create(@Param('iduser') userId: string) {
    return this.walletService.create(userId);
  }

  @Patch(':id/balance')
  async updateBalance(
    @Param('id') id: string,
    @Body() updateBalanceDto: UpdateBallanceDto,
  ) {
    const { ballance } = updateBalanceDto;
    return this.walletService.updateBalance(id, ballance);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.walletService.updateStatus(id, isActive);
  }
}

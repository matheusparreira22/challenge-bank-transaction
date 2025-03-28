import { Body, Controller, Param, Post } from "@nestjs/common";
import { TransferService } from "src/domain/transfer/usecase";
import { CreateTransferDto } from "src/domain/transfer/dto/create-transfer.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Transfer')
@Controller('transfer')
export class TransferController {

    constructor(
        private readonly transferService: TransferService
    ) {}

    @Post(':id')
    @ApiOperation({ summary: 'Create a new transfer' })
    @ApiResponse({ status: 201, description: 'Transfer created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async createTransfer(@Param('id') id: string, @Body() dto: CreateTransferDto) {
        return this.transferService.createTransfer(id, dto);
    }
}

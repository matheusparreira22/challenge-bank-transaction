import { UserEntity } from "src/domain/user/entity";
import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { WalletEntity } from "src/domain/wallet/entity";

@Entity('Transfers')
export class TransferEntity {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'The unique identifier for the transfer',
    })
    @Column({ name: 'id', type: 'uuid', primary: true, generated: 'uuid' })
    id: string;

    @ApiProperty({
        description: 'The user who is sending the money',
        type: () => WalletEntity,
    })
    @ManyToOne(() => WalletEntity)
    @JoinColumn({ name: 'sender_id' })
    sender: WalletEntity;

    @ApiProperty({
        description: 'The user who is receiving the money',
        type: () => WalletEntity,
    })
    @ManyToOne(() => WalletEntity)
    @JoinColumn({ name: 'receiver_id' })
    receiver: WalletEntity;

    @ApiProperty({
        example: 150.75,
        description: 'The amount being transferred',
        minimum: 0.01,
    })
    @Column({ name: 'amount', type: 'decimal' })
    amount: number;

    @Column({ name: 'authorized', type: 'boolean', default: true })
    authorized: boolean;

    @ApiProperty({
        example: '2024-01-20T15:30:00Z',
        description: 'The timestamp when the transfer was created',
    })
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}

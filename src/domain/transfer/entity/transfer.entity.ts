import { UserEntity } from "src/domain/user/entity";
import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";

@Entity('Transfers')
export class TransferEntity {
    @Column({ name: 'id', type: 'uuid', primary: true, generated: 'uuid' })
    id: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'sender_id' })
    sender: UserEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'receiver_id' })
    receiver: UserEntity;

    @Column({ name: 'amount', type: 'decimal' })
    amount: number;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
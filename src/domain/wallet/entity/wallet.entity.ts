import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from 'src/domain/user/entity/user.entity';
import { TransferEntity } from 'src/domain/transfer/entity';

@Entity('Wallets')
export class WalletEntity {
  @Column({ name: 'id', type: 'uuid', primary: true, generated: 'uuid' })
  id: string;

  @Column({ name: 'ballance', type: 'float', default: 0 })
  ballance: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: Boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // @Column({ name: 'user_id', type: 'uuid', unique: true })
  // userId: string;

  @OneToOne(() => UserEntity, user => user.wallet)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => TransferEntity, transfer => transfer.sender)
  transferSender: TransferEntity
}

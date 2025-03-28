import { WalletEntity } from "src/domain/wallet/entity/wallet.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity('Users')
export class UserEntity {
    @Column({ name: 'id', type: 'uuid', primary: true , generated: 'uuid' })
    id: string

    @Column({ name: 'full_name', type: 'varchar', length: 255 })
    fullName: String

    @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
    email: String

    @Column({ name: 'password', type: 'varchar', length: 255 })
    password: String

    @Column({ name: 'cpf', type: 'varchar', length: 11, unique: true })
    cpf: String

    @Column({ name: 'is_lojist', type: 'boolean', default: false })
    isLojist: Boolean

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: Boolean
    
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date

    @OneToOne(() => WalletEntity, (wallet) => wallet.id)
    wallet: WalletEntity
}
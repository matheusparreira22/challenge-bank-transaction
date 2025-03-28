import { Column, Entity, OneToOne } from "typeorm";

@Entity('Wallets')
export class WalletEntity {
    @Column({ name: 'id', type: 'uuid', primary: true , generated: 'uuid' })
    id: string

    @Column({ name: 'ballance', type: 'decimal', default: 0 })
    ballance: number

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: Boolean
    
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date

    
}

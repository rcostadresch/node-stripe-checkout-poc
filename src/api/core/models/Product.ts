import { BaseEntity, ManyToOne, OneToMany } from 'typeorm'

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from '../framework'

import { Ticket, User } from '@models'

interface IProduct {
  name: string
  description?: string
  gateway_product_id?: string
  gateway_product_uri?: string
  created_by: User
}

@Entity('products')
export class Product extends BaseEntity {
  public constructor(init?: Partial<IProduct>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  gateway_product_id: string

  @Column({ nullable: true })
  gateway_product_uri: string

  @OneToMany(() => Ticket, (ticket) => ticket.product, { onDelete: 'CASCADE' })
  tickets: Ticket[]

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  created_by: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

import { BaseEntity, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm'

import { Entity, Column, PrimaryGeneratedColumn } from '../framework'

import { Product, Ticket } from '@models'

interface IUser {
  name: string
  email: string
  gateway_account_id?: string
  gateway_customer_id?: string
}

@Entity('users')
export class User extends BaseEntity {
  public constructor(init?: Partial<IUser>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column({ nullable: true })
  gateway_account_id: string

  @Column({ nullable: true })
  gateway_customer_id: string

  @OneToMany(() => Product, (event) => event.created_by, { onDelete: 'CASCADE' })
  products: Product[]

  @OneToMany(() => Ticket, (ticket) => ticket.user, { onDelete: 'CASCADE' })
  tickets: Ticket[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

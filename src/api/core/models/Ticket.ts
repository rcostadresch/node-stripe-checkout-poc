import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'
import { Product, User } from '@models'

interface ITicket {
  product_id: string
  user_id: string
  product: Product
  user: User
  gateway_receipt_uri?: string
}

@Entity('tickets')
export class Ticket extends BaseEntity {
  public constructor(init?: Partial<ITicket>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  product_id: string

  @Column()
  user_id: string

  @ManyToOne(() => Product, (product) => product.tickets, { onDelete: 'CASCADE' })
  product: Product

  @ManyToOne(() => User, (user) => user.tickets)
  user: User

  @Column({ nullable: true })
  gateway_receipt_uri: string
}

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { v4 } from 'uuid'
import { Product } from '../product/product.entity'

@Entity()
export class Order {
  constructor(fields?: Partial<Order> & Pick<Order, 'userID'>) {
    Object.assign(this, fields)
  }

  @PrimaryGeneratedColumn()
  id!: number

  @Index()
  @Column('uuid')
  uuid!: string

  @Index()
  @Column('int', { name: 'user_id' })
  userID!: number

  @Index()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date

  @Index()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date

  @OneToMany(() => OrderDetail, x => x.order, {
    cascade: true
  })
  orderDetailList?: OrderDetail[]

  @BeforeInsert()
  beforeInsert() {
    this.uuid = v4()
  }
}

@Entity('order_detail')
@Unique('constraint', ['orderID', 'productID'])
export class OrderDetail {
  constructor(
    fields?: Partial<OrderDetail> & Pick<OrderDetail, 'productID' | 'quantity'>
  ) {
    Object.assign(this, fields)
  }

  @PrimaryColumn('int', { name: 'order_id' })
  orderID!: number

  @PrimaryColumn('int', { name: 'product_id' })
  productID!: number

  @Column('int')
  quantity!: number

  // add foreign constraint to `Order`
  @ManyToOne(() => Order, x => x.orderDetailList)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order?: Order

  // add foreign constraint to `Product`
  @ManyToOne(() => Product, x => x.id)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product!: Product
}

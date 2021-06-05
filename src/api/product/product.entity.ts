import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number

  @ApiProperty()
  @Column('varchar')
  name!: string

  @ApiProperty()
  @Column('decimal')
  price!: number

  @Index()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date

  @Index()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date

  /** link to cloud storage */
  @ApiProperty()
  @Column('varchar', { name: 'image_url' })
  imageURL!: string

  /** link to cloud storage */
  @ApiProperty()
  @Column('varchar', { name: 'description_url' })
  descriptionURL!: string

  @Column('tinyint')
  enable!: 1 | 0
}

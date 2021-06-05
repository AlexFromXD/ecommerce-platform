import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  name!: string

  @Column('decimal')
  price!: number

  /** link to cloud storage */
  @Column('varchar', { name: 'image_url' })
  imageURL!: string

  /** link to cloud storage */
  @Column('varchar', { name: 'description_url' })
  descriptionURL!: string
}

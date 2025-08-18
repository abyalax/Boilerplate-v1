import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EProductStatus } from '../product.interface';
import type { Category } from './category.entity';

@Entity({ name: 'products' })
@Index(['name'], { fulltext: true })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: string;

  @Column({ type: 'enum', enum: EProductStatus })
  status: EProductStatus;

  @Column({ type: 'int', nullable: false, default: 0 })
  stock: number;

  @Column({ nullable: true })
  category_id: number;

  @ManyToOne('Category', 'products', { onDelete: 'RESTRICT', onUpdate: 'CASCADE', eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updated_at?: Date;
}

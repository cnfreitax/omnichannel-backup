import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('options')
export default class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  to: number;

  @Column()
  container_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

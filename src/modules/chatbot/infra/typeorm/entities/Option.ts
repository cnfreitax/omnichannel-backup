import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('options')
export default class Containers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: number;

  @Column()
  to: number;

  @Column()
  container_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('token_access')
export default class TokenAccess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  validate: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

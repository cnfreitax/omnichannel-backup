import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('attendance')
export class ContactRecord {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  costumer_id: number;

  @Column()
  company_id: number;

  @Column()
  attendant_id: number;

  @Column()
  sector_id: number;

  @Column()
  chat_type: string;

  @Column()
  initial_date: Date;

  @Column()
  final_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

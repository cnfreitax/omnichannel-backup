import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sectors')
class Sector {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  label: string;

  @Column()
  phone: string;

  @Column()
  company_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sector;

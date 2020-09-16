import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('companies')
class Company {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  email: string;

  @Column()
  codCampaign: string;

  @Column()
  webhook_status: string;

  @Column()
  webhook_response: string;

  @Column()
  logo: string;

  @Column()
  address: string;

  @Column()
  website: string;

  @Column()
  activity: string;

  @Column()
  ddd: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Company;

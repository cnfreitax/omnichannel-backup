import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ContainerType {
  GREETING = 'greeting',
  CHAT = 'chat',
  MENU = 'menu',
  MESSAGE = 'message',
  MEDIA = 'media',
  API = 'api',
  SURVEY = 'survey',
  END_SERVICE = 'end_service',
  END_CHATBOT = 'end_chatbot',
}

@Entity('containers')
export default class Containers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  from: number;

  @Column({ nullable: true })
  to: number;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    name: 'type',
    enum: ContainerType,
    default: ContainerType.GREETING,
  })
  type: ContainerType;

  @Column()
  company_id: number;

  @Column({ type: 'json', nullable: true })
  content: JSON;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum MessageType {
  GREETING = 'greeting',
  CHAT = 'chat',
  SUBMENU = 'submenu',
  MESSAGE = 'message',
  MEDIA = 'media',
  API = 'api',
  SURVEY = 'survey',
  END_SERVICE = 'end_service',
  END_CHATBOT = 'end_chatbot',
}

@Entity('messages')
class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  parent_id: number | null;

  @Column()
  text: string;

  @Column({
    type: 'enum',
    name: 'type',
    enum: MessageType,
    default: MessageType.GREETING,
  })
  type: MessageType;

  @Column()
  company_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Messages;

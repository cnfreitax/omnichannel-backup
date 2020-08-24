import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('messages')
class Messages {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  parent_id: number;

  @Column()
  text: string;

  @Column()
  type: 'greeting' | 'chat' | 'submenu' | 'end_service' | 'message' | 'return' | 'media' | 'api' | 'satisfaction' | 'end_chatbot';

  @Column()
  company: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Messages;

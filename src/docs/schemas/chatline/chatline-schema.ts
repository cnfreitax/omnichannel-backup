export const chatlineSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    customer_id: {
      type: 'number',
    },
    sector_id: {
      type: 'number',
    },
    attendant_id: {
      type: 'number',
    },
    created_at: {
      type: 'string',
    },
    updated_at: {
      type: 'string',
    },
  },
};

/**
 * id: number;

  @Column()
  company_id: number;

  @Column()
  customer_id: number;

  @Column()
  sector_id: number;

  @Column()
  attendant_id: number;

  @Column()
  is_attended: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
 */

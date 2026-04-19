import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export class Ticket {
  id: string;
  film: string;
  session: string;
  daytime: string;
  day: string;
  time: string;
  row: number;
  seat: number;
  price: number;
  taken: string[];
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  id: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Column({ type: 'json', default: () => "'[]'" })
  tickets: Ticket[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

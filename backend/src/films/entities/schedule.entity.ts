import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  daytime: string;

  @Column({ type: 'integer', nullable: false })
  hall: number;

  @Column({ type: 'integer', nullable: false })
  rows: number;

  @Column({ type: 'integer', nullable: false })
  seats: number;

  @Column({ type: 'double precision', nullable: false })
  price: number;

  @Column({ type: 'json', nullable: false, default: () => "'[]'" })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedules)
  @JoinColumn({ name: 'filmId' })
  film: Film;

  @Column({ type: 'uuid', nullable: true })
  filmId: string;
}

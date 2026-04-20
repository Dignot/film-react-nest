import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  about: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  director: string;

  @Column({ type: 'double precision', nullable: false })
  rating: number;

  @Column({ type: 'json', nullable: false, default: () => "'[]'" })
  tags: string[];

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'varchar', nullable: false })
  cover: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { eager: true })
  schedules: Schedule[];
}

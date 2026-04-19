import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { FilmResponseDto, ScheduleDto } from '../films/dto/films.dto';

export interface IFilmsRepository {
  getAllFilms(): Promise<FilmResponseDto[]>;
  getFilmById(filmId: string): Promise<Film>;
  getSchedule(filmId: string): Promise<ScheduleDto[]>;
}

const normalizeTaken = (taken?: string | string[] | null): string[] => {
  if (!taken) {
    return [];
  }

  if (Array.isArray(taken)) {
    return taken.map(String).map((seat) => seat.trim()).filter(Boolean);
  }

  const trimmed = taken.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed)
        ? parsed.map(String).map((seat) => seat.trim()).filter(Boolean)
        : [];
    } catch {
      // fall through to comma-separated parsing
    }
  }

  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((seat) => seat.trim().replace(/^"|"$/g, ''))
      .filter(Boolean);
  }

  return trimmed.split(',').map((seat) => seat.trim()).filter(Boolean);
};

const parseScheduleToDto = (schedule: Schedule): ScheduleDto => ({
  id: schedule.id,
  daytime: schedule.daytime,
  hall: schedule.hall.toString(),
  rows: schedule.rows,
  seats: schedule.seats,
  price: schedule.price,
  taken: normalizeTaken(schedule.taken),
});

const parseFilmToDto = (film: Film): FilmResponseDto => ({
  id: film.id,
  title: film.title,
  about: film.about,
  description: film.description,
  director: film.director,
  rating: film.rating,
  tags: film.tags
    ? film.tags.split(',').map(t => t.trim()).filter(t => t)
    : [],
  image: film.image,
  cover: film.cover,
  schedules: film.schedules
    ? film.schedules.map(parseScheduleToDto)
    : [],
});

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async getAllFilms(): Promise<FilmResponseDto[]> {
    const films = await this.filmRepository.find({
      relations: ['schedules'],
    });
    return films.map(parseFilmToDto);
  }

  async getFilmById(filmId: string): Promise<Film> {
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedules'],
    });
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    return film;
  }

  async getSchedule(filmId: string): Promise<ScheduleDto[]> {
    const schedules = await this.scheduleRepository.find({
      where: { filmId },
    });
    return schedules.map(parseScheduleToDto);
  }
}

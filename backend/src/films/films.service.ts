import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmResponseDto, ScheduleDto } from './dto/films.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsRepository) {}

  async getAllFilms(): Promise<FilmResponseDto[]> {
    return this.filmsRepository.getAllFilms();
  }

  async getFilmById(filmId: string): Promise<Film> {
    const film = await this.filmsRepository.getFilmById(filmId);
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    return film;
  }

  async getSchedule(filmId: string): Promise<ScheduleDto[]> {
    return this.filmsRepository.getSchedule(filmId);
  }
}

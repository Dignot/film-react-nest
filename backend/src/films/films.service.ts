import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmResponseDto } from './dto/films.dto';
import { Schedule } from './schemas/film.schema';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsRepository) {}


  async getAllFilms(): Promise<FilmResponseDto[]> {
    return this.filmsRepository.getAllFilms();
  }

 
  async getFilmSchedule(filmId: string): Promise<Schedule[]> {
    return this.filmsRepository.getFilmSchedule(filmId);
  }
}

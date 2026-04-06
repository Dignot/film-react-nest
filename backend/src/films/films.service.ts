import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './schemas/film.schema';
import { FilmResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  /**
   * Получить все фильмы из БД
   */
  async getAllFilms(): Promise<FilmResponseDto[]> {
    return this.filmModel.find().exec();
  }

  /**
   * Получить расписание фильма по ID
   */
  async getFilmSchedule(filmId: string): Promise<any[] | null> {
    const film = await this.filmModel.findOne({ id: filmId }).exec();
    if (!film) {
      return null;
    }
    return film.schedule;
  }
}

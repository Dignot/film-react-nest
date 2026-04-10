import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, Schedule } from '../films/schemas/film.schema';
import { FilmResponseDto } from '../films/dto/films.dto';

export interface IFilmsRepository {
  getAllFilms(): Promise<FilmResponseDto[]>;
  getFilmSchedule(filmId: string): Promise<Schedule[]>;
}

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  async getAllFilms(): Promise<FilmResponseDto[]> {
    return this.filmModel.find().exec();
  }

  async getFilmSchedule(filmId: string): Promise<Schedule[]> {
    const film = await this.filmModel.findOne({ id: filmId }).exec();
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    return film.schedule;
  }
}
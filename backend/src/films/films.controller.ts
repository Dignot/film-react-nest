import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getFilms() {
    const films = await this.filmsService.getAllFilms();
    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id')
  async getFilmById(@Param('id') id: string) {
    const film = await this.filmsService.getFilmById(id);
    return film;
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    const schedule = await this.filmsService.getSchedule(id);
    return {
      total: schedule.length,
      items: schedule,
    };
  }
}

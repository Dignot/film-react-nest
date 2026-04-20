export class ScheduleDto {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class FilmResponseDto {
  id: string;
  title: string;
  about: string;
  description: string;
  director: string;
  rating: number;
  tags: string[];
  image: string;
  cover: string;
  schedules?: ScheduleDto[];
}

export class CreateFilmDto {
  title: string;
  about: string;
  description: string;
  director: string;
  rating: number;
  tags: string[];
  image: string;
  cover: string;
}

export class UpdateFilmDto {
  title?: string;
  about?: string;
  description?: string;
  director?: string;
  rating?: number;
  tags?: string[];
  image?: string;
  cover?: string;
}

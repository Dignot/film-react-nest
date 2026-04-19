import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { OrderDto, OrderResultDto } from '../order/dto/order.dto';

const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export interface IOrderRepository {
  createOrder(orderDto: OrderDto): Promise<OrderResultDto[]>;
}

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  private normalizeTaken(taken?: string | string[] | null): string[] {
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
  }

  async createOrder(orderDto: OrderDto): Promise<OrderResultDto[]> {
    const sessions = new Map<string, {
      session: Schedule;
      bookedSeats: Set<string>;
    }>();

    for (const ticket of orderDto.tickets) {
      const film = await this.filmRepository.findOneBy({ id: ticket.film });
      if (!film) {
        throw new BadRequestException(`Film ${ticket.film} not found`);
      }

      let cached = sessions.get(ticket.session);
      if (!cached) {
        const session = await this.scheduleRepository.findOneBy({ id: ticket.session });
        if (!session) {
          throw new BadRequestException(
            `Session ${ticket.session} not found for film ${ticket.film}`,
          );
        }

        if (session.filmId && session.filmId !== ticket.film) {
          throw new BadRequestException(
            `Session ${ticket.session} does not belong to film ${ticket.film}`,
          );
        }

        const bookedSeats = new Set(this.normalizeTaken(session.taken));
        cached = { session, bookedSeats };
        sessions.set(ticket.session, cached);
      }

      const seatKey = `${ticket.row}:${ticket.seat}`;
      if (cached.bookedSeats.has(seatKey)) {
        throw new BadRequestException(`Seat ${seatKey} is already taken`);
      }
      cached.bookedSeats.add(seatKey);
    }

    for (const { session, bookedSeats } of sessions.values()) {
      session.taken = JSON.stringify(Array.from(bookedSeats));
      await this.scheduleRepository.save(session);
    }

    const items: OrderResultDto[] = orderDto.tickets.map((ticket) => ({
      id: generateId(),
      ...ticket,
    }));

    return items;
  }
}
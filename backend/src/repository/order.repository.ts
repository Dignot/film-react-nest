import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../order/schemas/order.schema';
import { Film } from '../films/schemas/film.schema';
import { OrderDto, OrderResultDto } from '../order/dto/order.dto';

const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export interface IOrderRepository {
  createOrder(orderDto: OrderDto): Promise<OrderResultDto[]>;
}

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Film.name) private filmModel: Model<Film>,
  ) {}

  async createOrder(orderDto: OrderDto): Promise<OrderResultDto[]> {
    // Проверить и забронировать места
    for (const ticket of orderDto.tickets) {
      const film = await this.filmModel.findOne({ id: ticket.film }).exec();
      if (!film) {
        throw new BadRequestException(`Film ${ticket.film} not found`);
      }
      const session = film.schedule.find(s => s.id === ticket.session);
      if (!session) {
        throw new BadRequestException(`Session ${ticket.session} not found for film ${ticket.film}`);
      }
      const seatKey = `${ticket.row}:${ticket.seat}`;
      if (session.taken.includes(seatKey)) {
        throw new BadRequestException(`Seat ${seatKey} is already taken`);
      }
      // Добавить в taken
      session.taken.push(seatKey);
    }

    // Сохранить изменения в фильмах
    for (const ticket of orderDto.tickets) {
      await this.filmModel.updateOne(
        { id: ticket.film, 'schedule.id': ticket.session },
        { $push: { 'schedule.$.taken': `${ticket.row}:${ticket.seat}` } }
      ).exec();
    }

    const items: OrderResultDto[] = orderDto.tickets.map((ticket) => ({
      id: generateId(),
      ...ticket,
    }));

    await this.orderModel.create({
      id: generateId(),
      email: orderDto.email,
      phone: orderDto.phone,
      tickets: items,
    });

    return items;
  }
}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { OrderDto, OrderResultDto } from './dto/order.dto';

const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async createOrder(orderDto: OrderDto): Promise<OrderResultDto[]> {
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

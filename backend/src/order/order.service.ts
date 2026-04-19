import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { OrderDto, OrderResultDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async createOrder(orderDto: OrderDto): Promise<OrderResultDto[]> {
    return this.orderRepository.createOrder(orderDto);
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { OrderDto, OrderResultDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async createOrder(orderDto: OrderDto): Promise<OrderResultDto[]> {
    try {
      return await this.orderRepository.createOrder(orderDto);
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : 'Failed to create order');
    }
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderDto: OrderDto) {
    const items = await this.orderService.createOrder(orderDto);
    return {
      total: items.length,
      items,
    };
  }
}

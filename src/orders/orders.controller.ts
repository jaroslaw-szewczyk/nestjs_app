import { Controller,Get, Post, Put, Body, Delete, Param, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOderDTO } from 'src/orders/dtos/create-order.dto';
import { UpdateOderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if(!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Post('/')
    create(@Body() orderData: CreateOderDTO) {
      return this.ordersService.create(orderData);
    }

  @Put('/:id')
  async update(@Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateOderDTO ) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Product not found');
  
    await this.ordersService.updateById(id, productData);
    return { success: true };
  }

  @Delete('/:id')
    async deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Product not found');
  
    await this.ordersService.deleteOrder(id);
    return { success: true };
    }
}

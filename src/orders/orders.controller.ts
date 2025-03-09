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
  public getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = this.ordersService.getById(id);
    if(!order) throw new NotFoundException('Order not found');
    return order;
  }
  @Post('/')
    create(@Body() orderData: CreateOderDTO) {
      return this.ordersService.create(orderData);
    }

  @Put('/:id')
    update(@Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateOderDTO ) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Product not found');
  
    this.ordersService.updateById(id, productData);
    return { success: true };
  }

  @Delete('/:id')
    deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Product not found');
  
    this.ordersService.deleteOrder(id);
    return { success: true };
    }
}

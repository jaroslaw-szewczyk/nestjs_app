import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';


@Injectable()
export class OrdersService {

  constructor(private prissmaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prissmaService.order.findMany();
  }

  public getById(id: Order['id']): Promise<Order | null> {
      return this.prissmaService.order.findUnique( {
        where: { id }
      });
    }

  public create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Order> {
    return this.prissmaService.order.create({
      data: orderData
    });
  }

  public updateById(
    id: Order['id'], orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Order> {
      return this.prissmaService.order.update({
        where: { id },
        data: orderData
      })
    }

  public deleteOrder(id: Order['id']): Promise<Order> {
    return this.prissmaService.order.delete({
      where: { id }
    });
    }
}

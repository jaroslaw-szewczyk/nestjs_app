import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';


@Injectable()
export class OrdersService {

  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({ include: { product: true }});
  }

  public getById(id: Order['id']): Promise<Order | null> {
      return this.prismaService.order.findUnique( {
        where: { id }
      });
    }

  public create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    const { productId, ...otherData } = orderData;
    return this.prismaService.order.create({
      data: {
        ...otherData,
        product: {
          connect: { id: productId },
        },
      }
    });
  }

  public updateById(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    const { productId, ...otherData } = orderData;
    return this.prismaService.order.update({
      where: { id },
      data: {
        ...otherData,
        product: {
          connect: { id: productId },
        },
      },
    });
  }

  public deleteOrder(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id }
    });
    }
}

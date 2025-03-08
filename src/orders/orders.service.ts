import { Injectable } from '@nestjs/common';
import { db ,Order } from 'src/db';

@Injectable()
export class OrdersService {

  public getAll(): Order[] {
    return db.orders;
  }

  public getById(id: Order['id']): Order | undefined {
      return db.orders.find(order => order.id === id);
    }
}

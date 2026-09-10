import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrderItem } from './order-Item.entity';
import { GuestCheckService } from '../guest-checks/guest-checks.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from './entities/order-entity';

@Injectable()
export class OrderService {
  ProductService: any;
  constructor(
    private readonly guestCheckService: GuestCheckService,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

   private async prepareItems(dto: CreateOrderDto): Promise<OrderItem> {
    const product = await this.ProductService.findOne(dto.productId);
    const subtotal = dto.quantity * product.price;

    return this.orderItemRepository.create({
      product,
      quantity: dto.quantity,
      subtotal
    })
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    // Regra 1: verificar se tem comanda aberta para a mesa
    const guestCheck =
      await this.guestCheckService.findOrCreateOpened(dto.spotId);

    // Monta o totalizador do pedido
    const items: OrderItem[];
    let total = 0;

    for (const itemDto of dto.item) {
        const item = await this.prepareItems(itemDto);
        items.push(item);
        total += Number(item.subtotal)
        
        }

        //Monta o pedido
        const order = this.orderRepository.create({
        guestCheck,
        status: OrderStatus.NEW,
        total
        });

        //Grava no banco opedido
        await this.orderRepository.save(order);

        return this.orderRepository.save(order);
       
  }
}

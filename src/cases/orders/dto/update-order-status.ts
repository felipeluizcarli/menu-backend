import { IsEnum } from "class-validator";
import { OrderStatus } from "../entities/order-entity";

export class updateOrderStatusDto {
    @IsEnum(OrderStatus)
    status: OrderStatus
}
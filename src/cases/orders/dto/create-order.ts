import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested, IsUUID, IsInt, IsPositive } from "class-validator";

export class CreateOrderItemDto {
    @IsUUID()
    productId: string;

    @IsInt()
    @IsPositive()
    quantity: number;
}

export class CreateOrderDto {
    @IsUUID()
    spotId: string;


    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    item: CreateOrderItemDto;
}


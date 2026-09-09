import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { Product } from "../products/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    controllers: [CategoryController],
    providers: [CategoryService]
})

export class CategoryModule {}
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber, Min, IsUUID, IsUrl } from "class-validator";

export class UpdateProductDto {


  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;


  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsUUID()
  categoryId?: string;


  @IsOptional()
  @IsBoolean()  
  active?: boolean;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  picture?: string
} 

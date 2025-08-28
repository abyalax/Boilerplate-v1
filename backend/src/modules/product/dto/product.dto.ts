import { Expose, Type } from 'class-transformer';
import { EProductStatus } from '../product.schema';
import { CategoryDto } from './category-product.dto';
import { IsEnum, IsNumber, IsNumberString, IsString } from 'class-validator';

export class ProductDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsNumberString()
  price: string;

  @Expose()
  @IsEnum(EProductStatus)
  status: EProductStatus;

  @Expose()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @Expose()
  @IsNumber()
  stock: number;

  @Expose()
  created_at?: Date;

  @Expose()
  updated_at?: Date;
}

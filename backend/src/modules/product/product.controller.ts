import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CategoryDto, CreateCategoryDto } from './dto/category-product.dto';
import { PayloadProductDto } from './dto/payload-product.dto';
import { Roles } from '~/common/decorators/roles.decorator';
import { QueryProductDto } from './dto/query-product.dto';
import { RolesGuard } from '~/common/guards/roles.guard';
import { AuthGuard } from '~/common/guards/auth.guard';
import { JwtGuard } from '~/common/guards/jwt.guard';
import { TResponse } from '~/common/types/response';
import { ProductService } from './product.service';
import { MetaResponse } from '~/common/types/meta';
import { ProductDto } from './dto/product.dto';

@UseGuards(AuthGuard, JwtGuard, RolesGuard)
@Roles('Admin', 'Cashier')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async get(@Query() query: QueryProductDto): Promise<TResponse<{ data: ProductDto[]; meta: MetaResponse }>> {
    console.log(query);
    const products = await this.productService.find(query);
    return {
      statusCode: HttpStatus.OK,
      data: products,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('categories')
  async getCategories(): Promise<TResponse<CategoryDto[]>> {
    const data = await this.productService.getCategories();
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() PayloadProductDto: PayloadProductDto): Promise<TResponse<ProductDto>> {
    const product = await this.productService.create(PayloadProductDto);
    return {
      statusCode: HttpStatus.CREATED,
      data: product,
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/categories')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<TResponse<CategoryDto>> {
    const data = await this.productService.createCategory(createCategoryDto);
    return {
      statusCode: HttpStatus.CREATED,
      data: data,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('ids')
  async getIdProducts(): Promise<TResponse<number[]>> {
    const ids = await this.productService.getIds();
    return {
      statusCode: HttpStatus.OK,
      data: ids,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOneByID(@Param('id') id: number): Promise<TResponse<ProductDto>> {
    const product = await this.productService.findOneByID(id);
    return {
      statusCode: HttpStatus.OK,
      data: product,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() PayloadProductDto: PayloadProductDto): Promise<TResponse<boolean>> {
    const isUpdated = await this.productService.update(id, PayloadProductDto);
    return {
      statusCode: HttpStatus.OK,
      data: isUpdated,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<TResponse<boolean>> {
    const isDeleted = await this.productService.remove(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      data: isDeleted,
    };
  }
}

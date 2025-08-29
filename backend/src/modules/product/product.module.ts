import { Module } from '@nestjs/common';
import { productProvider } from './product.provider';
import { ProductService } from './product.service';
import { DatabaseModule } from '~/infrastructure/database/database.module';
import { ProductController } from './product.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [...productProvider, ProductService],
  controllers: [ProductController],
})
export class ProductModule {}

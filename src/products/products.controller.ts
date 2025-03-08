import { Controller, Delete, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './create-product.dto';

@Controller('products')
export class ProductsController { 
  constructor(private productsService: ProductsService) {} 

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Delete('/:id')
  public deleteProduct(@Param('id') id: string) {
    this.productsService.deleteProduct(id);
    return { success: true }
  }
}

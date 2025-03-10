import { Controller, Delete, Get, Param, Post, Put,    Body,  ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController { 
  constructor(private productsService: ProductsService) {} 

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }
  @Get('/extended')
  getAllExtended(): any {
    return this.productsService.getAllExtended();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  @Get('/extended/:id')
  async getByIdExtended(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getByIdExtended(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');

    await this.productsService.updateById(id, productData);
    return { success: true };
  }

  @Delete('/:id')
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
  if (!(await this.productsService.getById(id)))
    throw new NotFoundException('Product not found');

  await this.productsService.deleteProduct(id);
  return { success: true };
  }
}

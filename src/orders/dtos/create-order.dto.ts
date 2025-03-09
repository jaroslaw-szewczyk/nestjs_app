import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateOderDTO {

  @IsNotEmpty()
  @IsString()
  productId: string

  @IsNotEmpty()
  @IsString()
  client: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
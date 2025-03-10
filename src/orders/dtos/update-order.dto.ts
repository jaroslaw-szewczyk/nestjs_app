import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateOderDTO {

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
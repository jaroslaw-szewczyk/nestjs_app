import {
  IsNotEmpty,
  IsString,
  IsUUID
} from 'class-validator';

export class CreateOderDTO {

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string

  @IsNotEmpty()
  @IsString()
  clientId: string;
}
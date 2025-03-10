import {
  IsNotEmpty,
  IsString,
  IsUUID
} from 'class-validator';

export class UpdateOderDTO {

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string

  @IsNotEmpty()
  @IsString()
  clientId: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCityDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "O nome da cidade é obrigatório" })
  @IsString({ message: "O nome da cidade deve ser um texto válido" })
  readonly name: string;
}

export class DeleteCityDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly id: number;
}
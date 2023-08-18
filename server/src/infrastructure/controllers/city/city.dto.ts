import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCityDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class DeleteCityDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly id: number;
}
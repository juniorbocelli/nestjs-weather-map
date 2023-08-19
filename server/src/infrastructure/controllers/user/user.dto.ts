import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsAlphanumeric } from 'class-validator';

export class AddUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "O username é obrigatório" })
  @MinLength(8, { message: "O username deve ter no mínimo 8 caracteres" })
  @IsString({ message: "O username deve ser um texto válido" })
  @MaxLength(20, { message: "O username deve ter no máximo 20 caracteres" })
  @IsAlphanumeric("pt_br", { message: "O username deve ser um texto válido" })
  readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "A senha é obrigatória" })
  @IsString({ message: "A senha deve ser um texto válido" })
  @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres" })
  @MaxLength(20, { message: "A senha deve ter no máximo 20 caracteres" })
  @IsAlphanumeric("pt_br", { message: "A senha deve ser um texto válido" })
  readonly password: string;

  @ApiProperty({ required: false })
  readonly lang: string;

  @ApiProperty({ required: false })
  readonly units: string;
}

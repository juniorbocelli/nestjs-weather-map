import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsAlphanumeric, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "O username é obrigatório" })
  @IsString({ message: "O username deve ser um texto válido" })
  @IsAlphanumeric("en-US", { message: "O username deve ser um texto válido" })
  readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "A senha é obrigatória" })
  @IsString({ message: "A senha deve ser um texto válido" })
  @IsAlphanumeric("en-US", { message: "O username deve ser um texto válido" })
  readonly password: string;
}

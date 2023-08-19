import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "O nome de usuário é obrigatório" })
  @IsString({ message: "O nome de usuário deve ser um texto" })
  readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "A senha é obrigatória" })
  @IsString()
  readonly password: string;
}

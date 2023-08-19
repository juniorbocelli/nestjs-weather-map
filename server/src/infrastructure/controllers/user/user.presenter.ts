import { ApiProperty } from '@nestjs/swagger';
//
import { UserWithoutPassword } from 'src/domain/model/user';

export class UserPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  lang: string;

  @ApiProperty()
  units: string;

  @ApiProperty()
  create_date: Date;

  @ApiProperty()
  updated_date: Date;

  constructor(user: UserWithoutPassword) {
    this.id = user.id;
    this.username = user.username;

    this.lang = user.lang;
    this.units = user.units;

    this.create_date = user.createDate;
    this.updated_date = user.updatedDate;
  };
}

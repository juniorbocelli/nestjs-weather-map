import { ApiProperty } from '@nestjs/swagger';
import { UserM } from '../../../domain/model/user';

export class UserPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  create_date: Date;
  @ApiProperty()
  updated_date: Date;

  constructor(user: UserM) {
    this.id = user.id;
    this.username = user.username;

    this.create_date = user.createDate;
    this.updated_date = user.updatedDate;
  };
}

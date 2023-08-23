import { ApiProperty } from '@nestjs/swagger';

//
import { UserM, UserWithoutPassword } from 'src/domain/model/user';

export class IsAuthPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  refreshToken: string;

  constructor(userWithoutPassword: UserWithoutPassword) {
    this.id = userWithoutPassword.id;
    this.username = userWithoutPassword.username;
    this.refreshToken = userWithoutPassword.hashRefreshToken;
  };
};


export class AuthPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  refreshToken: string;

  constructor(userM: UserM) {
    this.id = userM.id;
    this.username = userM.username;
    this.refreshToken = userM.hashRefreshToken;
  };
};

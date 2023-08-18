import { UserM } from 'src/domain/model/user';

export class CityM {
  private _id: number;
  private _name: string;
  private _user: UserM;

  private _createDate: Date;

  public get id() {
    return this._id;
  };

  public set id(id: number) {
    this._id = id;
  };

  public get name() {
    return this._name;
  };

  public set name(name: string) {
    this._name = name;
  };

  public get createDate() {
    return this._createDate;
  };

  public set createDate(createDate: Date) {
    this._createDate = createDate;
  };

  public get user() {
    return this._user;
  };

  public set user(user: UserM) {
    this._user = user;
  };
};
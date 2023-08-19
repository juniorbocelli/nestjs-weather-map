import { UserM } from 'src/domain/model/user';

export class CityM {
  private _id: number;

  private _apiId: number;

  private _user: UserM;

  private _createDate: Date;

  public get id() {
    return this._id;
  };

  public set id(id: number) {
    this._id = id;
  };

  public get apiId() {
    return this._apiId;
  };

  public set apiId(apiId: number) {
    this._apiId = apiId;
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
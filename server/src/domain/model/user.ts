import { CityM } from 'src/domain/model/city';

export class UserWithoutPassword {
  private _id: number;
  private _username: string;
  private _cities: CityM[];

  private _lang: string = "pt_br";
  private _units: string = "metric";

  private _createDate: Date;
  private _updatedDate: Date;

  private _lastLogin: Date;
  private _hashRefreshToken: string;

  public get id() {
    return this._id;
  };

  public set id(id: number) {
    this._id = id;
  };

  public get username() {
    return this._username;
  };

  public set username(username: string) {
    this._username = username;
  };

  public get cities() {
    return this._cities;
  };

  public set cities(cities: CityM[]) {
    this._cities = cities;
  };

  public get lang() {
    return this._lang;
  };

  public set lang(lang: string) {
    this._lang = lang;
  }

  public get units() {
    return this._units;
  };

  public set units(units: string) {
    this._units = units;
  };

  public get createDate() {
    return this._createDate;
  };

  public set createDate(createDate: Date) {
    this._createDate = createDate;
  };

  public get updatedDate() {
    return this._updatedDate;
  };

  public set updatedDate(updatedDate: Date) {
    this._updatedDate = updatedDate;
  };

  public get lastLogin() {
    return this._lastLogin;
  };

  public set lastLogin(lastLogin: Date) {
    this._lastLogin = lastLogin;
  };

  public get hashRefreshToken() {
    return this._hashRefreshToken;
  };

  public set hashRefreshToken(hashRefreshToken: string) {
    this._hashRefreshToken = hashRefreshToken;
  };
}

export class UserM extends UserWithoutPassword {
  private _password: string;

  public get password() {
    return this._password;
  };

  public set password(password: string) {
    this._password = password;
  };
}

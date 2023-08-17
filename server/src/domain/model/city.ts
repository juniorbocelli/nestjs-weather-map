export class CityM {
  private _id: number;
  private _name: string;
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
};
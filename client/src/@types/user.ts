export interface IUser {
  id: number;
  username: string;
  refreshToken: string;

  // TODO save and recovery this data from database
  lang?: string;
  units?: string;

  type?: number; // permissions
};
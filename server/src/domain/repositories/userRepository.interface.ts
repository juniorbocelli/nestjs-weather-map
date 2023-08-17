import { UserM } from '../model/user';

export interface UserRepository {
  insert(user: UserM): Promise<UserM>;
  getUserByUsername(username: string): Promise<UserM>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
}

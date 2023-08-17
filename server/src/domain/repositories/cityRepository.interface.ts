import { CityM } from '../model/city';

export interface CityRepository {
  insert(city: CityM): Promise<CityM>;
  findAllFromUser(userId: number): Promise<CityM[]>;
  deleteById(id: number): Promise<void>;
}

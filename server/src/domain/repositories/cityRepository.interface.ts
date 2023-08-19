import { CityM } from 'src/domain/model/city';

export interface CityRepository {
  findById(id: number): Promise<CityM>;
  insert(city: CityM): Promise<CityM>;
  findAllFromUser(userId: number): Promise<CityM[]>;
  deleteById(id: number): Promise<void>;
}

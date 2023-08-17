// domain model
import { UserM } from '../../domain/model/user';
// interfaces
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
// services
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';

export class AddUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,) { };

  async execute(username: string, password: string): Promise<UserM> {
    const user = new UserM();
    user.username = username;
    user.password = await this.bcryptService.hash(password);
    user.cities = [];

    const result = await this.userRepository.insert(user);
    this.logger.log('addUserUseCases execute', 'New user have been inserted');

    return result;
  };
}

// domain model
import { UserM } from 'src/domain/model/user';
// interfaces
import { ILogger } from 'src/domain/logger/logger.interface';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
// services
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class AddUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly exceptionService: ExceptionsService,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,) { };

  async execute(username: string, password: string): Promise<UserM> {
    const userToTest = await this.userRepository.getUserByUsername(username);

    if (userToTest) {
      this.exceptionService.badRequestException({ code_error: 400, message: "Já existe um usuário cadastrado com esse username" });
      this.logger.warn('addUserUseCases execute', 'User already exist');
    };

    const user = new UserM();
    user.username = username;
    user.password = await this.bcryptService.hash(password);
    user.cities = [];

    const result = await this.userRepository.insert(user);
    this.logger.log('addUserUseCases execute', 'New user have been inserted');

    return result;
  };
}

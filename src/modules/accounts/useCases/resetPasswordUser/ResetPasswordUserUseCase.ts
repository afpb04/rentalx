import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/accounts/repositories/IUsersRepository';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,
  ) {}
  async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token,
    );
    if (!userToken) {
      throw new AppError('Token invalid!');
    }
    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError('Token expired!');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
export default ResetPasswordUserUseCase;

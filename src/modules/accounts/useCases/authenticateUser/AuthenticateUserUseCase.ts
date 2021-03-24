import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import IUserRepository from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email or password incorrect!');
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Email or password incorrect!');
    }
    const token = sign({}, '9445a6e37d6537a130ac3d6247d66455', {
      subject: user.id,
      expiresIn: '1d',
    });
    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
    return tokenReturn;
  }
}
export default AuthenticateUserUseCase;

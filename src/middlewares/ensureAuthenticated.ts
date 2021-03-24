import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import UsersRepository from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const auth = request.headers.authorization;

  if (!auth) {
    throw new Error('Token missing!');
  }
  const [, token] = auth.split(' ');
  try {
    const { sub: user_id } = verify(
      token,
      '9445a6e37d6537a130ac3d6247d66455',
    ) as IPayload;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    next();
  } catch {
    throw new Error('Invalid token!');
  }
}

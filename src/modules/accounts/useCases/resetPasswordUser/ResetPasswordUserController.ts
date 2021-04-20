import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordUserUseCase from './ResetPasswordUserUseCase';

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password } = request.body;
    const { token } = request.query;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase,
    );

    await resetPasswordUserUseCase.execute({
      password,
      token: token as string,
    });

    return response.status(200).send();
  }
}

export default ResetPasswordUserController;

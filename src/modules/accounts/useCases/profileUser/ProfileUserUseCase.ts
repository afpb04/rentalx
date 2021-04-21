import { injectable, inject } from 'tsyringe';

import IUserResponseDTO from '@modules/accounts/dtos/IUserResponseDTO';
import UserMap from '@modules/accounts/mapper/UserMap';
import IUserRepository from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    return UserMap.toDTO(user);
  }
}
export default ProfileUserUseCase;

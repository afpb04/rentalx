import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../entities/User';

interface IUserRepository {
  create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
export default IUserRepository;

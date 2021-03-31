import { container } from 'tsyringe';

import UsersRepository from '@modules/accounts/repositories/implementations/UsersRepository';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import ICategoryRepository from '@modules/cars/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/cars/repositories/implementations/CategoriesRepository';
import SpecificationRepository from '@modules/cars/repositories/implementations/SpecificationRepository';
import ISpecificationRepository from '@modules/cars/repositories/ISpecificationRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

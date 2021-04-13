import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import SpecificationsRepositoryInMemory from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification ', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });
  it('should not be able to add a new specification to a now-existent car', async () => {
    await expect(
      createCarSpecificationUseCase.execute({
        car_id: 'car_id',
        specifications_id: ['specification'],
      }),
    ).rejects.toEqual(new AppError('Car does not exists!'));
  });
  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABS-123',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: 'Specification',
      description: 'Specification description',
    });
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});

import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCarUseCase from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;
describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABS-123',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });
  it('should not be able to create a car with exist license plate', async () => {
    await expect(async () => {
      await createCarUseCase.execute({
        name: 'Name Car',
        description: 'Description car',
        daily_rate: 100,
        license_plate: 'ABS-123',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category',
      });
      await createCarUseCase.execute({
        name: 'Car 2',
        description: 'Description car',
        daily_rate: 100,
        license_plate: 'ABS-123',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});

import dayjs from 'dayjs';

import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import RentalsRepositoryInMemory from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import DayJsDateProvider from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import AppError from '@shared/errors/AppError';

import CreateRentalUseCase from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayJsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Rentals', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayJsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });
  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '1234',
      car_id: '12345',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental if there is another open the same user', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '12345',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '12345',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new rental if there is another open the same car', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '1234512',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        user_id: '12344',
        car_id: '1234512',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new rental with invalid return time!', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '1234512',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name } = request.query;

    const listAvailableCars = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAvailableCars.execute({
      brand: brand as string,
      category_id: category_id as string,
      name: name as string,
    });

    return response.json(cars);
  }
}

export default ListAvailableCarsController;

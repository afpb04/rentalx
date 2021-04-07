import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadCarImagesUseCase from './UploadCarImagesUseCase';

interface IFIle {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const images = request.files as IFIle[];
    const { id } = request.params;

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map(file => file.filename);

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export default UploadCarImagesController;

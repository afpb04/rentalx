import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '@modules/cars/useCases/createCategory/CreateCategoryController';
import ImportCategoryController from '@modules/cars/useCases/ImportCategory/ImportCategoryController';
import ListCategoryController from '@modules/cars/useCases/listCategories/ListCategoryController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

categoriesRoutes.use(ensureAuthenticated);

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export default categoriesRoutes;

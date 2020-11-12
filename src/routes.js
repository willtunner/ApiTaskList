import { Router } from 'express';

// Importa o controller do User
import UserController from './app/controllers/UserController';

const routes = new Router();

// Rotas do usuário
routes.post('users', UserController.store);

export default routes;

import { Router } from 'express';

// Importa o controller do User
import UserController from './app/controllers/UserController';
// Importar o controller session
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Rotas do usuário
routes.post('/users', UserController.store);
// Rotas Sessions
routes.post('/sessions', SessionController.store);

export default routes;

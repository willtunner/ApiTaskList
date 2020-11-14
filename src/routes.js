import { Router } from 'express';

// Importa o controller do User
import UserController from './app/controllers/UserController';
// Importar o controller session
import SessionController from './app/controllers/SessionController';

// Importa o middleware
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Rotas do usuário
routes.post('/users', UserController.store);

// Rotas Sessions
routes.post('/sessions', SessionController.store);

// Tudo que estiver abaixo precisa de token
routes.use(authMiddleware);

// Precisa está logado para executar
routes.put('/users', authMiddleware, UserController.update);

export default routes;

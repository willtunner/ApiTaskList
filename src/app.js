import express from 'express';
import cors from 'cors';
import routes from './routes';

// importa o index dentro de database
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Chama por primeiro, deixando em branco qualquer aplicação pode ter acesso
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

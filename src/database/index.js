import Sequelize from 'sequelize';
// Importa as configurações do banco
import databaseConfig from '../config/database';

// Importa os models
import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init(); // Chama o método abaixo, pode haver vários
  }

  init() {
    // Passa a conexão para o this.connection
    this.connection = new Sequelize(databaseConfig);
    // Percorre todos os models do array e inicializa com a conexão
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();

import Sequelize from 'sequelize';
// Importa as configurações do banco
import databaseConfig from '../config/database';

// Importa os models
import User from '../app/models/User';
import Task from '../app/models/Task';

const models = [User, Task];

class Database {
  constructor() {
    this.init(); // Chama o método abaixo, pode haver vários
  }

  init() {
    // Passa a conexão para o this.connection
    this.connection = new Sequelize(databaseConfig);
    // Percorre todos os models do array e inicializa com a conexão
    models
      .map((model) => model.init(this.connection))
      .map(
        // (model) => model.associate: Verifica se tem uma associação (static associate(models)) Dentro dos models
        // && Se tiver
        // model.associate(this.connection.models): Passa a conexão dos models
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();

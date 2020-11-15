module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      task: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      check: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      // Acrescenta o id do usuario que criou essa tarefa
      user_id: {
        type: Sequelize.INTEGER,
        // referencia o id da tabela usuarios
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        // onDelete - quando excluir o usuario seta para null a tarefa
        onDelete: 'SET NULL',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('tasks');
  },
};

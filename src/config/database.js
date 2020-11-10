module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '29011967log*',
  database: 'tasklist',
  define: {
    timestamps: true, // Quando cria algo coloca o create at e update at
    underscored: true,
    underscoredAll: true, // coloca user_id no banco
  },
};

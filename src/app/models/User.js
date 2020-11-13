import Sequelize, { Model } from 'sequelize';

// Importa o bcrypt para fazer o hash
import bcrypt from 'bcrypt';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // Add um campo virtual
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // Antes dele criar algo ele chama o hook
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
  }
}

export default User;

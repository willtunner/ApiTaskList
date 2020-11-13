import Sequelize, { Model } from 'sequelize';

// Importa o bcrypt para fazer o hash
import bcrypt from 'bcryptjs';

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
    // Pega usuario que vem do insominia (body)
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

export default User;

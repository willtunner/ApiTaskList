import User from '../models/User';

class UserController {
  async store(req, res) {
    // Verifica se existe algum email já cadastrado
    const userExist = await User.findOne({
      where: { email: req.body.email },
    });

    // se o usuario existir da um bad request com msg de erro
    if (userExist) {
      return res.status(400).json({ error: 'Usuario já existe.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();

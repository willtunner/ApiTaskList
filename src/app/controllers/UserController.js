import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // Define um schema para o Yup
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação!' });
    }

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

  // Atualiza o usuario
  async update(req, res) {
    // Pega o email e senha antiga
    const { email, oldPassword } = req.body;
    // Pega usuario pelo id
    const user = await User.findByPk(req.userId);

    // Verifica se o email é diferente do cadastrado no banco
    if (email !== user.email) {
      // Verifica se existe algum email já cadastrado
      const userExist = await User.findOne({
        where: { email },
      });

      // se o usuario existir da um bad request com msg de erro
      if (userExist) {
        return res.status(400).json({ error: 'Usuario já existe.' });
      }
    }

    // Verifica se a senha foi alterada
    // oldPassword && : se tiver preenchido o oldPassword ele...
    // valida a senha !(await user.checkPassword(oldPassword))
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    // Atualiza com os dados do body(insominia)
    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();

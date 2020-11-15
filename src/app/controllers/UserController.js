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
    // Cria o schema do yup para validar
    const schema = Yup.object().shape({
      // No update nome não é obrigatório
      name: Yup.string(),
      email: Yup.string().email(),
      // oldPassword = Password atual
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        // Quando(When) tiver oldPassword cria uma função condicional!, (qual o campo?, próprio campo(field)) =>
        // Se tiver 'oldPassword'(condição) é (próprio campo(field)).requerido() :
        // Se não(se não tiver enviado o oldPassword) passa o proprio campo, não é obrigatório.
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        // oneOf: O que digitou no field tem que ser igal ao campo de referencia do oneOf
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // Verificação de erro
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação - update!' });
    }

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

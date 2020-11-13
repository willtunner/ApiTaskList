import jwt from 'jsonwebtoken';
import User from '../models/User';

// Importa o auth.js
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    // Checking if this email exists
    const user = await User.findOne({ where: { email } });

    // if the user does not exist
    if (!user) {
      return res.status(401).json({ error: 'Usuario não cadastrado' });
    }

    // Verifica se a senha não confere
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha Incorreta!' });
    }

    // Retorna somente o id e nome
    const { id, name } = user;

    // https://www.md5online.org/ - site usado para gerar senha abaixo
    // The MD5 hash for greencodebr is : 5d08dbede74f726bec693fc0a78f04e7
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        // Expira em 7 dias
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();

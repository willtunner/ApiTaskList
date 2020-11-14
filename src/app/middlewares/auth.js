import jwt from 'jsonwebtoken';
// promisify: Transforma uma função de callback em async await
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não existe!' });
  }

  // Tira os espaços
  // [bearer, token] remove o bearer e os espaços
  const [, token] = authHeader.split(' ');

  try {
    // jwt.verify: Pede  duas coisas 'token e secret key'
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Pega o id do usuario logado
    req.userId = decoded.id;

    // console.log(decoded);
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido!' });
  }

  // descarta primeira posição e pega somente o token acima
  /*
  const token = [
    'token',
    '123123123'
  ]
  */
  // return next();
};

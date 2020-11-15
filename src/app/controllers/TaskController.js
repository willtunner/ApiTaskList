import * as Yup from 'yup';
import Task from '../models/Task';

class TaskController {
  // Para listar todas as tarefas
  async index(req, res) {
    const tasks = await Task.findAll({
      // ser_id: req.userId: Retorna as tasks da pessoa logada
      // check: false: que estão marcadas como false/ não concluida
      where: { user_id: req.userId, check: false },
    });

    return res.json(tasks);
  }

  // Para salvar tarefas
  async store(req, res) {
    // Cria o schema definindo que o campo task vindo do front/insominia não pode ser em branco
    const schema = Yup.object().shape({
      task: Yup.string().required(),
    });

    // Se não for valido retorna mensagem de erro
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha ao cadastrar. ' });
    }

    const { task } = req.body;

    const tasks = await Task.create({
      // Pega o id do usuário
      user_id: req.userId,
      // Pega a tarefa e cria no banco
      task,
    });

    // Retorna o objeta que criamos
    return res.json(tasks);
  }
}

export default new TaskController();

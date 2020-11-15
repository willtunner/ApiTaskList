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

  async update(req, res) {
    // pega o task_id vindo do routes como definimos
    const { task_id } = req.params;

    // Procura pelo id no banco de dados se existe
    const task = await Task.findByPk(task_id);

    // Se o id informado não existir
    if (!task) {
      return res.status(400).json({ error: 'Tarefa não existe ln:50' });
    }

    // Se o id for informado correto prossegue
    // Prossegue para o update vindo pelo front para alterar para true a task
    await task.update(req.body);

    return res.json(task);
  }

  async delete(req, res) {
    // Verifica se existe o task enviado pelo params
    const { task_id } = req.params;
    const task = await Task.findByPk(task_id);

    // Se o id informado não existir
    if (!task) {
      return res.status(400).json({ error: 'Tarefa não existe ln:50' });
    }

    // Verifica se o idUser da task é o mesmo do ususriop logado
    if (task.user_id !== req.userId) {
      return res.status(401).json({ error: 'Requisicação não autorizada' });
    }

    // Exclui no banco
    await task.destroy();
    return res.send();
  }
}

export default new TaskController();

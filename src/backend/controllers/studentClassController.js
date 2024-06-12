const StudentClass = require('../models/StudentsClasses.js');
const Student = require('../models/Student.js');
const ClassSchedule = require('../models/ClassSchedule.js');

/**
 * Retorna todos os estudantes pertencentes a uma classe específica.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 * @returns {Object} - Resposta JSON contendo os estudantes ou mensagem de erro.
 */
const getStudentsByClassId = async (req, res) => {
  const { class_schedule_id } = req.params;

  try {
    if (!class_schedule_id) {
      return res.status(400).json({ error: 'ID do horário da classe é obrigatório' });
    }

    // Encontra todas as entradas StudentClass com o class_schedule_id especificado
    const studentClassIds = await StudentClass.findAll({
      where: { class_schedule_id },
      attributes: ['student_id'],
    });

    // Extrai os student_ids das entradas StudentClass recuperadas
    const studentIds = studentClassIds.map(studentClass => studentClass.student_id);

    // Encontra todos os estudantes com os student_ids extraídos
    const students = await Student.findAll({
      where: { id: studentIds },
    });

    // Responde com os estudantes recuperados
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Retorna todas as classes de estudantes.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 * @returns {Object} - Resposta JSON contendo as classes de estudantes ou mensagem de erro.
 */
const getAllStudentClasses = async (req, res) => {
  try {
    // Encontra todas as classes de estudantes
    const studentClasses = await StudentClass.findAll();
    // Responde com as classes de estudantes recuperadas
    res.json(studentClasses);
  } catch (error) {
    // Trata erros
    res.status(500).json({ error: 'Erro ao buscar as classes de estudantes.' });
  }
};

/**
 * Retorna uma classe de estudantes pelo seu ID.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 * @returns {Object} - Resposta JSON contendo a classe de estudantes ou mensagem de erro.
 */
const getStudentClassById = async (req, res) => {
  const { id } = req.params;

  try {
    // Encontra uma classe de estudantes pelo seu ID
    const studentClass = await StudentClass.findByPk(id);
    if (studentClass) {
      // Responde com a classe de estudantes recuperada
      res.json(studentClass);
    } else {
      // Trata caso em que a classe de estudantes não é encontrada
      res.status(404).json({ error: 'Classe de estudantes não encontrada.' });
    }
  } catch (error) {
    // Trata erros
    res.status(500).json({ error: 'Erro ao buscar a classe de estudantes.' });
  }
};

/**
 * Cria uma nova classe de estudantes.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 * @returns {Object} - Resposta JSON contendo a classe de estudantes recém-criada ou mensagem de erro.
 */
const createStudentClass = async (req, res) => {
  const { student_id, class_schedule_id } = req.body;

  try {
    // Verifica se tanto student_id quanto class_schedule_id existem no corpo da requisição
    if (!student_id || !class_schedule_id) {
      return res.status(400).json({
        error: 'student_id ou class_schedule_id inválido. Ambos os IDs de aluno e horário de classe são necessários.',
      });
    }

    // Verifica se o aluno e o horário de classe referenciados existem
    const studentExists = await Student.findByPk(student_id);
    const classExists = await ClassSchedule.findByPk(class_schedule_id);
    if (!studentExists || !classExists) {
      return res.status(400).json({
        error: 'student_id ou class_schedule_id inválido. Aluno ou Horário de Classe não encontrados.',
      });
    }

    // Cria uma nova entrada de classe de estudantes
    const newStudentClass = await StudentClass.create({
      student_id,
      class_schedule_id,
    });

    // Responde com a classe de estudantes recém-criada
    res.status(201).json(newStudentClass);
  } catch (error) {
    // Trata erros
    res.status(500).json({ error: 'Erro ao criar a classe de estudantes.' });
  }
};

/**
 * Atualiza uma classe de estudantes existente.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 * @returns {Object} - Resposta JSON contendo a classe de estudantes atualizada ou mensagem de erro.
 */
const updateStudentClass = async (req, res) => {
  const { id } = req.params;
  const { student_id, class_schedule_id } = req.body;

  try {
    // Encontra a classe de estudantes pelo seu ID
    const studentClass = await StudentClass.findByPk(id);
    if (studentClass) {
      // Verifica se tanto student_id quanto class_schedule_id existem no corpo da requisição
      if (!student_id || !class_schedule_id) {
        return res.status(400).json({
          error: 'student_id ou class_schedule_id inválido. Ambos os IDs de aluno e horário de classe são necessários.',
        });
      }

      // Verifica se o aluno e o horário de classe referenciados existem
      const studentExists = await Student.findByPk(student_id);
      const classExists = await ClassSchedule.findByPk(class_schedule_id);
      if (!studentExists || !classExists) {
        return res.status(400).json({
          error: 'student_id ou class_schedule_id inválido. Aluno ou Horário de Classe não encontrados.',
        });
      }

      // Atualiza a entrada de classe de estudantes
      await studentClass.update({
        student_id,
        class_schedule_id,
      });

      // Responde com a classe de estudantes atualizada
      res.json(studentClass);
    } else {
      // Trata caso em que a classe de estudantes não é encontrada
      res.status(404).json({ error: 'Classe de estudantes não encontrada.' });
    }
  } catch (error) {
    // Trata erros
    res.status(500).json({ error: 'Erro ao atualizar a classe de estudantes.' });
  }
};

/**
 * Exclui uma classe de estudantes pelo seu ID.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 * @returns {Object} - Resposta JSON contendo a mensagem de sucesso ou mensagem de erro.
 */
const deleteStudentClass = async (req, res) => {
  const { id } = req.params;

  try {
    // Encontra a classe de estudantes pelo seu ID
    const studentClass = await StudentClass.findByPk(id);
    if (studentClass) {
      // Exclui a entrada da classe de estudantes
      await studentClass.destroy();
      // Responde com a mensagem de sucesso
      res.json({ message: 'Classe de estudantes excluída com sucesso.' });
    } else {
      // Trata caso em que a classe de estudantes não é encontrada
      res.status(404).json({ error: 'Classe de estudantes não encontrada.' });
    }
  } catch (error) {
    // Trata erros
    res.status(500).json({ error: 'Erro ao excluir a classe de estudantes.' });
  }
};

module.exports = {
  getAllStudentClasses,
  getStudentClassById,
  createStudentClass,
  updateStudentClass,
  deleteStudentClass,
  getStudentsByClassId,
};

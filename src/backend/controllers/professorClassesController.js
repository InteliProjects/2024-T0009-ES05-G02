const ProfessorsClasses = require('../models/ProfessorClasses.js');
const Professor = require('../models/Professor.js');
const ClassInstance = require('../models/ClassInstance.js');

/**
 * Controller function to get professor information linked to a class instance ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with parameters.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing professor information linked to the class instance ID or an error message.
 */
const getProfessorByClassInstanceId = async (req, res) => {
  const { class_instance_id } = req.params;

  try {
    const professorClassInstances = await ProfessorsClasses.findAll({
      where: { class_instance_id },
      include: [
        {
          model: Professor,
          attributes: ['id', 'name'],
        },
      ],
    });

    const professors = professorClassInstances.map(instance => instance.Professor);

    res.json(professors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching professor information.' });
  }
};

/**
 * Controller function to create a new professor-class instance.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with parameters and body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the newly created professor-class instance or an error message.
 */
const createProfessorClassInstance = async (req, res) => {
  const { professor_id, class_instance_id } = req.body;

  try {
    const professorExists = await Professor.findByPk(professor_id);
    const classInstanceExists = await ClassInstance.findByPk(class_instance_id);

    if (!professorExists || !classInstanceExists) {
      return res.status(400).json({
        error: 'Invalid professor_id or class_instance_id. Professor or ClassInstance not found.',
      });
    }

    const newProfessorClassInstance = await ProfessorsClasses.create({
      professor_id,
      class_instance_id,
    });

    res.status(201).json(newProfessorClassInstance);
  } catch (error) {
    res.status(500).json({ error: 'Error creating professor-class instance.' });
  }
};

/**
 * Controller function to retrieve all professor-class instances.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing all professor-class instances or an error message.
 */
const getAllProfessorClassInstances = async (req, res) => {
  try {
    const professorClassInstances = await ProfessorsClasses.findAll();
    res.json(professorClassInstances);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching professor-class instances.' });
  }
};

/**
 * Controller function to retrieve a single professor-class instance by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with parameters.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the requested professor-class instance or an error message.
 */
const getProfessorClassInstanceById = async (req, res) => {
  const { id } = req.params;

  try {
    const professorClassInstance = await ProfessorsClasses.findByPk(id);
    if (!professorClassInstance) {
      return res.status(404).json({ error: 'Professor-class instance not found.' });
    }
    res.json(professorClassInstance);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching professor-class instance.' });
  }
};

/**
 * Controller function to update a professor-class instance by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with parameters and body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating the success or failure of the update.
 */
const updateProfessorClassInstance = async (req, res) => {
  const { id } = req.params;
  const { professor_id, class_instance_id } = req.body;

  try {
    const professorClassInstance = await ProfessorsClasses.findByPk(id);
    if (!professorClassInstance) {
      return res.status(404).json({ error: 'Professor-class instance not found.' });
    }

    const professorExists = await Professor.findByPk(professor_id);
    const classInstanceExists = await ClassInstance.findByPk(class_instance_id);

    if (!professorExists || !classInstanceExists) {
      return res.status(400).json({
        error: 'Invalid professor_id or class_instance_id. Professor or ClassInstance not found.',
      });
    }

    await professorClassInstance.update({
      professor_id,
      class_instance_id,
    });

    res.json({ message: 'Professor-class instance updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating professor-class instance.' });
  }
};

/**
 * Controller function to delete a professor-class instance by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with parameters.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating the success or failure of the deletion.
 */
const deleteProfessorClassInstance = async (req, res) => {
  const { id } = req.params;

  try {
    const professorClassInstance = await ProfessorsClasses.findByPk(id);
    if (!professorClassInstance) {
      return res.status(404).json({ error: 'Professor-class instance not found.' });
    }

    await professorClassInstance.destroy();
    res.json({ message: 'Professor-class instance deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting professor-class instance.' });
  }
};

module.exports = {
  createProfessorClassInstance,
  getAllProfessorClassInstances,
  getProfessorClassInstanceById,
  updateProfessorClassInstance,
  deleteProfessorClassInstance,
  getProfessorByClassInstanceId,
};

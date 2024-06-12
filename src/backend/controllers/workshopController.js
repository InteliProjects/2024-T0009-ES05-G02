const Workshop = require('../models/Workshop.js');

/**
 * Controller function to get all workshops.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing all workshops or an error message.
 */
const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.findAll();
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching workshops.' });
  }
};

/**
 * Controller function to get a workshop by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with parameters.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the workshop or an error message.
 */
const getWorkshopById = async (req, res) => {
  const { id } = req.params;

  try {
    const workshop = await Workshop.findByPk(id);
    if (workshop) {
      res.json(workshop);
    } else {
      res.status(404).json({ error: 'Workshop not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching workshop.' });
  }
};
/**
 * Controller function to create a new workshop.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with body parameters.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the newly created workshop or an error message.
 */
const createWorkshop = async (req, res) => {
  const { local, name, status, category, ong_id } = req.body;

  try {
    const newWorkshop = await Workshop.create({
      local,
      name,
      status,
      category,
      ong_id,
    });

    res.status(201).json(newWorkshop);
  } catch (error) {
    res.status(500).json({ error: 'Error creating workshop.' });
  }
};

/**
 * Controller function to update a workshop by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with parameters and body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the updated workshop or an error message.
 */
const updateWorkshop = async (req, res) => {
  const { id } = req.params;
  const { local, name, status, category, ong_id } = req.body;

  try {
    const workshop = await Workshop.findByPk(id);
    if (workshop) {
      await workshop.update({
        local,
        name,
        status,
        category,
        ong_id,
      });

      res.json(workshop);
    } else {
      res.status(404).json({ error: 'Workshop not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating workshop.' });
  }
};

/**
 * Controller function to delete a workshop by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with parameters.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating the success or failure of the deletion.
 */
const deleteWorkshop = async (req, res) => {
  const { id } = req.params;

  try {
    const workshop = await Workshop.findByPk(id);
    if (workshop) {
      await workshop.destroy();
      res.json({ message: 'Workshop deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Workshop not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting workshop.' });
  }
};

module.exports = {
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  getAllWorkshops,
  getWorkshopById,
};

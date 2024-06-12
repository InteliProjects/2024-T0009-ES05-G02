const ClassSchedule = require('../models/ClassSchedule.js');
const Workshop = require('../models/Workshop.js');

/**
 * Controller function to get all class schedules.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing all class schedules or an error message.
 */
const getAllClassSchedules = async (req, res) => {
  try {
    const classSchedules = await ClassSchedule.findAll();
    res.json(classSchedules);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching class schedules.' });
  }
};

/**
 * Controller function to get a class schedule by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with parameters.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the class schedule or an error message.
 */
const getClassScheduleById = async (req, res) => {
  const { id } = req.params;

  try {
    const classSchedule = await ClassSchedule.findByPk(id);
    if (classSchedule) {
      res.json(classSchedule);
    } else {
      res.status(404).json({ error: 'Class schedule not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching class schedule.' });
  }
};

/**
 * Controller function to create a new class schedule.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with body parameters.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the newly created class schedule or an error message.
 */
const createClassSchedule = async (req, res) => {
  const { workshop_id, day_of_week, start_time, end_time, status, frequency } = req.body;

  try {
    const workshopExists = await Workshop.findByPk(workshop_id);
    if (!workshopExists) {
      return res.status(400).json({ error: 'Invalid workshop_id. Workshop not found.' });
    }

    const newClassSchedule = await ClassSchedule.create({
      workshop_id,
      day_of_week,
      start_time,
      end_time,
      status,
      frequency,
    });

    res.status(201).json(newClassSchedule);
  } catch (error) {
    res.status(500).json({ error: 'Error creating class schedule.' });
  }
};

/**
 * Controller function to update a class schedule by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with parameters and body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the updated class schedule or an error message.
 */
const updateClassSchedule = async (req, res) => {
  const { id } = req.params;
  const { workshop_id, day_of_week, start_time, end_time, status, frequency } = req.body;

  try {
    const classSchedule = await ClassSchedule.findByPk(id);
    if (classSchedule) {
      await classSchedule.update({
        workshop_id,
        day_of_week,
        start_time,
        end_time,
        status,
        frequency,
      });

      res.json(classSchedule);
    } else {
      res.status(404).json({ error: 'Class schedule not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating class schedule.' });
  }
};

/**
 * Controller function to delete a class schedule by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object with parameters.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating the success or failure of the deletion.
 */
const deleteClassSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const classSchedule = await ClassSchedule.findByPk(id);
    if (classSchedule) {
      await classSchedule.destroy();
      res.json({ message: 'Class schedule deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Class schedule not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting class schedule.' });
  }
};

module.exports = {
  getAllClassSchedules,
  getClassScheduleById,
  createClassSchedule,
  updateClassSchedule,
  deleteClassSchedule,
};

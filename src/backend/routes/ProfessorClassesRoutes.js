const express = require('express');
const router = express.Router();
const professorClassesController = require('../controllers/professorClassesController');

router.post('/professor-class-instances', professorClassesController.createProfessorClassInstance);
router.get('/professor-class-instances', professorClassesController.getAllProfessorClassInstances);
router.get('/professor-class-instances/:id', professorClassesController.getProfessorClassInstanceById);
router.get('/professors-by-class-instance/:class_instance_id', professorClassesController.getProfessorByClassInstanceId);
router.put('/professor-class-instances/:id', professorClassesController.updateProfessorClassInstance);
router.delete('/professor-class-instances/:id', professorClassesController.deleteProfessorClassInstance);

module.exports = router;

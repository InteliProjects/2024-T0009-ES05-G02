const express = require('express');
const ClassInstanceController = require('../controllers/ClassInstanceController.js');

const router = express.Router();

router.get('/instance-classes', ClassInstanceController.getAllInstanceClasses);
router.get('/instance-classes/:id', ClassInstanceController.getInstanceClassesById);
router.post('/instance-classes', ClassInstanceController.createInstanceClasses);
router.put('/instance-classes/:id', ClassInstanceController.updateInstanceClasses);
router.delete('/instance-classes/:id', ClassInstanceController.deleteInstanceClasses);

module.exports = router;

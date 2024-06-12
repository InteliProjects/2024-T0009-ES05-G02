const express = require('express');
const workshopController = require('../controllers/workshopController');

const router = express.Router();

router.get('/workshops', workshopController.getAllWorkshops);
router.get('/workshops/:id', workshopController.getWorkshopById);
router.post('/workshops', workshopController.createWorkshop);
router.put('/workshops/:id', workshopController.updateWorkshop);
router.delete('/workshops/:id', workshopController.deleteWorkshop);

module.exports = router;

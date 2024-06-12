const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/ong/users/:id', userController.getUserByIdAndOng);

module.exports = router;

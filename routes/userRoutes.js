const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {auth} = require("../middlewares/authMiddleware")




router.get('/', userController.getAllUsers);
router.get('/:id',auth, userController.getUserById);
router.put('/:id',auth,userController.updateUser);
router.patch('/:id',auth,userController.patchUser);
router.delete('/:id',auth, userController.deleteUser);
router.post('/', userController.registerUser);

module.exports = router;

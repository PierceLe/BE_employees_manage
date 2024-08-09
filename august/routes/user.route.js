const express = require('express');
const userController = require('../controllers/users.controller');
const { authMiddleware, authorizationMiddleware } = require('../middlewares/auth.middlewares');
const router = express.Router();

router.get('/', authMiddleware, authorizationMiddleware, userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', userController.updateById);
router.delete('/:id', authorizationMiddleware, userController.deleteById);

module.exports = router
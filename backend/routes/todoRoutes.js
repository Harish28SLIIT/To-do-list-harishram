const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get all todos
router.get('/', todoController.getAllTodos);

// Get single todo
router.get('/:id', todoController.getTodo);

// Create todo
router.post('/', todoController.createTodo);

// Update todo
router.put('/:id', todoController.updateTodo);

// Delete todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router; 
const { Router } = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail, loginUserHandler } = require('./user.controller')

const router = Router()

//CRUD
router.post('/login', loginUserHandler)
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


module.exports = router
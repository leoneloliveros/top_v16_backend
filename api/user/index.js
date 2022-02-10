const { Router } = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail } = require('./user.controller')

const router = Router()

//CRUD
router.get('/login', getUserByEmail)
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


module.exports = router
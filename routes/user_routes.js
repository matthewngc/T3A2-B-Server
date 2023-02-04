import express from 'express'
import { createUser, getAllUsers, getOneUserByID, updateUser, deleteUser } from '../controllers/user_controller.js'

const router = express.Router()

// FOR ADMIN USE OR DEBUG PURPOSES
// Create user
router.post('/', 
    createUser)

// Get all users
router.get('/', 
    getAllUsers)

// Get one user
router.get('/:id', 
    getOneUserByID)

// Update user
router.put('/:id', 
    updateUser)

// Delete user
router.delete('/:id', 
    deleteUser)

export default router
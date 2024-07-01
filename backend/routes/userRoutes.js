import express from 'express';

import {
	authUser,
	deleteUser,
	getUserByID,
	getUserProfile,
	getUsers,
	registerUser,
	updateUser,
	updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.route('/login').post(authUser);
router.route('/').post(registerUser);

//General protected routes
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);

//Admin protected routes
router.route('/').get(protect, getUsers);
router.route('/:id').delete(protect, deleteUser);
router.route('/:id').get(protect, getUserByID);
router.route('/:id').put(protect, updateUser);

export default router;

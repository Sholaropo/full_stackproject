import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/search', userController.searchUsers);
router.get('/:username', userController.getUserByUsername);

export default router;


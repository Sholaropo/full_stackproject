import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUserByUsername);
router.get('/search', userController.searchUsers);

export default router;


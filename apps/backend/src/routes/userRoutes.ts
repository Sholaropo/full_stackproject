import express from 'express';
import userController from '../controllers/userController';
import { validateQuery, validateParams } from '../middleware/validateRequest';
import { searchUsersSchema, usernameParamSchema } from '../validators/userValidators';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/search', validateQuery(searchUsersSchema), userController.searchUsers);
router.get('/:username', validateParams(usernameParamSchema), userController.getUserByUsername);

export default router;


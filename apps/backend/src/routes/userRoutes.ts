import express from 'express';
import userController from '../controllers/userController';
import { validateQuery, validateParams, validateBody } from '../middleware/validateRequest';
import { searchUsersSchema, usernameParamSchema, updateUserSchema } from '../validators/userValidators';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/search', validateQuery(searchUsersSchema), userController.searchUsers);
router.get('/:username', validateParams(usernameParamSchema), userController.getUserByUsername);
router.put('/:username', validateParams(usernameParamSchema), validateBody(updateUserSchema), userController.updateUser);

export default router;


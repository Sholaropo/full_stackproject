import express from 'express';
import { requireAuth } from '@clerk/express';
import userController from '../controllers/userController';
import { validateQuery, validateParams, validateBody } from '../middleware/validateRequest';
import { searchUsersSchema, usernameParamSchema, updateUserSchema } from '../validations/userValidators';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/search', validateQuery(searchUsersSchema), userController.searchUsers);
router.get('/me/thoughts', requireAuth(), userController.getMyThoughts);
router.get('/:username', validateParams(usernameParamSchema), userController.getUserByUsername);
router.put('/:username', requireAuth(), validateParams(usernameParamSchema), validateBody(updateUserSchema), userController.updateUser);

export default router;


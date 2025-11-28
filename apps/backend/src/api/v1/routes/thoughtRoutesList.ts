import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import thoughtControllerList from '../controllers/thoughtControllerList';
import { validateRequestList } from '../middleware/validateRequestList';
import { thoughtSchemaList } from '../validations/thoughtSchemaList';

const router = Router();

router.get('/', thoughtControllerList.getAllThoughts.bind(thoughtControllerList));
router.get('/:id', thoughtControllerList.getThoughtById.bind(thoughtControllerList));

router.post(
  '/',
  validateRequestList(thoughtSchemaList),
  thoughtControllerList.createThought.bind(thoughtControllerList)
);

router.put(
  '/:id',
  requireAuth(),
  thoughtControllerList.updateThought.bind(thoughtControllerList)
);

router.delete(
  '/:id',
  requireAuth(),
  thoughtControllerList.deleteThought.bind(thoughtControllerList)
);

router.post(
  '/:id/like',
  requireAuth(),
  thoughtControllerList.toggleLike.bind(thoughtControllerList)
);

export default router;
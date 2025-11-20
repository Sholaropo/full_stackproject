import { Router } from 'express';
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

router.put('/:id', thoughtControllerList.updateThought.bind(thoughtControllerList));

router.delete('/:id', thoughtControllerList.deleteThought.bind(thoughtControllerList));

router.post('/:id/like', thoughtControllerList.toggleLike.bind(thoughtControllerList));

export default router;
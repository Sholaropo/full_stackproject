import { Router } from 'express';
import thoughtController from '../controllers/postthoughtController';

const router = Router();

router.get('/', thoughtController.getAll.bind(thoughtController));
router.get('/:id', thoughtController.getById.bind(thoughtController));
router.post('/', thoughtController.create.bind(thoughtController));
router.post('/:id/like', thoughtController.like.bind(thoughtController));
router.delete('/:id', thoughtController.delete.bind(thoughtController));

export default router;

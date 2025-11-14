import { Router } from 'express';
import thoughtRoutesList from './thoughtRoutesList';

const router = Router();

router.use('/thoughts', thoughtRoutesList);

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export default router;
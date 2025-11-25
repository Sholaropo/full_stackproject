import { Router } from 'express';
import thoughtRoutesList from './thoughtRoutesList';
import postthoughtRoutes from './postthoughtRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/thoughts', thoughtRoutesList);
router.use('/myThoughts', postthoughtRoutes);
router.use('/users', userRoutes);

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

router.get('/', (req, res) => {
  res.json({
    message: 'API v1 - ThoughtShare',
    endpoints: {
      health: '/api/v1/health',
      thoughts: '/api/v1/thoughts',
      myThoughts: '/api/v1/myThoughts',
      users: '/api/v1/users'
    }
  });
});

export default router;
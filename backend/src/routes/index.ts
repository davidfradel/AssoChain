import { Router } from 'express';
import userRoutes from './userRoutes';
import documentRoutes from './documentRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/documents', documentRoutes);

export default router;

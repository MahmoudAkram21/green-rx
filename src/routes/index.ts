import express, { Request, Response } from 'express';
const router = express.Router();

// Import route modules
import userRoutes from './user.routes.js';
// import productRoutes from './product.routes.js';

// Mount routes
router.use('/users', userRoutes);
// router.use('/products', productRoutes);

// Example route
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API is working' });
});

export default router;


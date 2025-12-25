import express from 'express';
const router = express.Router();
// Import route modules
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
// import productRoutes from './product.routes.js';
// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
// router.use('/products', productRoutes);
// Example route
router.get('/', (req, res) => {
    res.json({ message: 'API is working' });
});
export default router;
//# sourceMappingURL=index.js.map
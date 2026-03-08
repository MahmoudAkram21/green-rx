import express from 'express';
import { checkBatch, listBatchesByTradeName } from '../controllers/batchCheck.controller';
import { uploadMedicineImage } from '../config/multer.config';

const router = express.Router();

// GET: list all batch numbers for a trade name (trade name can have many batches)
router.get('/trade-name/:tradeNameId', listBatchesByTradeName);

// POST: optional JSON body { batchNumber } or multipart with image (or both; image tried first)
router.post(
  '/',
  uploadMedicineImage.single('image'),
  checkBatch
);

export default router;

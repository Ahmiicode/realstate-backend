import express from 'express';
import { getAllProperties, createProperty,getPropertyById} from '../controllers/propertyController.js';

import upload from '../middleware/upload.js';

const router = express.Router();

// Upload one image (e.g., 'image' field in form-data)
router.post('/', upload.single('image'), createProperty);
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

export default router;

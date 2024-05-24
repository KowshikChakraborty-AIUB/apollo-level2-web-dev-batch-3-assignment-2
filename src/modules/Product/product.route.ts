import express, { Request, Response } from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', ProductControllers.createProduct)
router.get('/', ProductControllers.getAllProduct)
router.get('/:productId', ProductControllers.getSpecificProduct)

export const ProductRoutes = router; 
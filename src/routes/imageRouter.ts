import * as express from 'express';
import imageController from '../controllers/ImagesController';

const router = express.Router();

router.get('/size', imageController.resize);

export default router;

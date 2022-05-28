import express = require('express');
import imageRouter from './imageRouter';

const routes = express.Router();

routes.use('/images', imageRouter);
routes.get('/', (req: express.Request, res: express.Response) : void => {
	res.send('Welcome to Image Processing API');
});

export default routes;

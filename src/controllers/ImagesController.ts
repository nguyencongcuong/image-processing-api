import imageServices from '../services/ImageServices';
import * as fs from 'fs';
import { PATH } from '../constants/path';
import log from '../utilities/log';

class ImagesController {

	// [GET] ./images/size
	public async resize(req, res) {

		const { name, width, height } = req.query;

		const allImages = fs.readdirSync(PATH.IMAGE_FOLDER_FULL);
		const image = allImages.find((item: string) => item.includes(name));
		const inputPath = `${PATH.IMAGE_FOLDER_FULL}/${name}.jpg`;
		const outputPath = `${PATH.IMAGE_FOLDER_THUMB}/${name}-${width}x${height}.jpg`;

		if (!image) {
			log.error('ImagesController.resize()', 'Image not found!')
			res.sendStatus(404)
		} else if(imageServices.isResized({name, width, height})) {
			res.sendFile(outputPath);
		} else {
			try {

				await imageServices.resize({
					source: inputPath,
					target: outputPath,
					width: Number(width),
					height: Number(height),
				});

				await imageServices.addToCache({name, width, height})

				res.sendFile(outputPath);
			} catch (error) {
				log.error('ImagesController.resize()', 'Resize failed. Check your query!')
				res.send({ success: false, message: `Resize failed. Check your query!` });
			}
		}
	}
}

export default new ImagesController();
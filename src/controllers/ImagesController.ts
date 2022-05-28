import imageServices, { CacheServiceModel } from '../services/ImageServices';
import { PATH } from '../constants/path';
import express = require('express');

class ImagesController {
	// [GET] ./images/size
	public async resize(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		const { name, width, height } = req.query;
		const inputPath = `${PATH.IMAGE_FOLDER_FULL}/${name}.jpg`;
		const outputPath = `${PATH.IMAGE_FOLDER_THUMB}/${name}-${width}x${height}.jpg`;

		const isImageExist = await imageServices.isImageExist(<string>name);
		const isValidWidth = await imageServices.isValidNumber(width);
		const isValidHeight = await imageServices.isValidNumber(height);
		const isResized = imageServices.isResized(<CacheServiceModel>{
			name,
			width,
			height,
		});

		if (!isImageExist || !isValidWidth || !isValidHeight) {
			const imageErrorMessage = (name: string) =>
				`Image ${name} not found!. Please use one of the followingnames: encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica.`;
			const widthErrorMessage = 'invalid width value!';
			const heightErrorMessage = 'invalid height value!';

			!isImageExist && res.status(404);

			res.send(`
			Something is wrong with your query. Please check again: <br> 
			- name: ${isImageExist ? 'valid' : imageErrorMessage(<string>name)} <br>
			- width: ${isValidWidth ? 'valid' : widthErrorMessage} <br>
			- height: ${isValidHeight ? 'valid' : heightErrorMessage}
			`);

		} else if (isResized) {
			res.sendFile(outputPath);
		} else {
			try {
				await imageServices.resize({
					source: inputPath,
					target: outputPath,
					width: Number(width),
					height: Number(height),
				});

				await imageServices.addToCache(<CacheServiceModel>{
					name,
					width,
					height,
				});

				res.sendFile(outputPath);
			} catch (error) {
				res.send({
					success: false,
					message: 'Resize failed. Check your query!',
				});
			}
		}
	}
}

export default new ImagesController();

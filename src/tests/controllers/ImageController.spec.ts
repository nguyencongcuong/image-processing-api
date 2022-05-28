import ImagesController from '../../controllers/ImagesController';
import * as fs from 'fs';
import { PATH } from '../../constants/path';
import { Request, Response } from 'express';

describe('ImagesController', () => {
	describe('.resize()', () => {
		it('should resize the image and save to ./public/images/thumb with correct name, width, height respectively', async () => {
			// Arrange
			const req  = {
				query: {
					name: 'fjord',
					width: '300',
					height: '400',
				},
			};

			const res = {
				send: () => 'message',
			};
			const { name, width, height } = req.query;

			// Act
			await ImagesController.resize(<Request><unknown>req, <Response><unknown>res);
			const resizedImages = fs.readdirSync(PATH.IMAGE_FOLDER_THUMB);

			// Assert
			expect(resizedImages.includes(`${name}-${width}x${height}.jpg`)).toBe(
				true
			);
		});
	});
});

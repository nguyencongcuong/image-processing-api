import { PATH } from '../../constants/path';
import imageServices from '../../services/ImageServices';
import * as fs from 'fs';

describe('imageServices:', () => {

	describe('.resize()', () => {
		it('should resize the image and save it to ./public/images/thumb', async () => {

			// Arrange
			const name = 'fjord'
			const width = 200
			const height = 300
			const ext = 'jpg'
			const source = `${PATH.IMAGE_FOLDER_FULL}/${name}.${ext}`;
			const target = `${PATH.IMAGE_FOLDER_THUMB}/${name}-${width}x${height}.${ext}`

			// Act
			await imageServices.resize({source, target, width, height})
			const dir = fs.readdirSync(PATH.IMAGE_FOLDER_THUMB)

			// Assert
			const result = dir.includes(`${name}-${width}x${height}.jpg`)

			expect(result).toEqual(true)
		})
	})

	describe('.addToCache()', () => {
		it(`should save the resized image's name in ./.cache/resized-images.txt`, async () => {

			// Arrange
			const name = 'santamonica'
			const width = '500'
			const height = '500'

			// Act
			await imageServices.addToCache({name, width, height})

			// Assert
			await fs.readFile(PATH.CACHE_FOLDER + '/resized-images.txt', (err, data) => {
				const result = data.includes(`${name}-${width}x${height}.jpg`)
				expect(result).toEqual(true)
			})

		});
	})

	describe('.isResized', () => {

		// Arrange
		const name = 'icelandwaterfall'
		const width = '500'
		const height = '500'
		const resizedImageName = `${name}-${width}x${height}.jpg`
		fs.writeFileSync(`${PATH.CACHE_FOLDER}/resized-images.txt`, resizedImageName, {flag: 'a+'})

		it(`should return true if the image is cached`, () => {
			// Act
			const result = imageServices.isResized({name, width, height})

			// Assert
			expect(result).toEqual(true)
		})

		it('should return false if the image has not been cached yet', () => {
			// Act
			const result = imageServices.isResized({name: 'fjord', width, height})

			// Assert
			expect(result).toEqual(false)
		})
	})

})
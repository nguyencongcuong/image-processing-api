import sharp = require('sharp');
import log from '../utilities/log';
import * as fs from 'fs';
import { PATH } from '../constants/path';

interface ResizeServiceModel {
	source: string;
	target: string;
	width: number;
	height: number;
}

interface CacheServiceModel {
	name: string;
	width: string;
	height: string;
}

class ImageServices {
	constructor() {
		this.onCacheInit();
	}

	private onCacheInit() {
		fs.mkdir(`${PATH.ROOT}/.cache`, { recursive: true }, (error) => {
			if (error) {
				log.error(
					'ImageServices.onCacheInit()',
					'Unable to create .cache folder!'
				);
			}
			log.info(
				'ImageServices.onCacheInit()',
				'.cache folder created successfully!'
			);
		});
	}

	public async resize(params: ResizeServiceModel): Promise<void> {
		try {
			await sharp(params.source)
				.resize(params.width, params.height)
				.jpeg({ quality: 100 })
				.toFile(params.target);

			log.info(
				'ImageServices.resize()',
				'The image has been resized successfully!'
			);
		} catch (error) {
			log.error('ImageServices.resize()', {
				message: 'This image could not be resized.',
				source: params.source,
				target: params.target,
				width: params.width,
				height: params.height,
			});
			throw new Error('Something is wrong. The image could not be resized!');
		}
	}

	public async addToCache(params: CacheServiceModel): Promise<void> {
		fs.writeFile(
			PATH.CACHE_FOLDER + '/resized-images.txt',
			`${params.name}-${params.width}x${params.height}.jpg\n`,
			{ flag: 'a+' },
			(error) => {
				if (error) {
					log.error('ImageServices.cache()', 'Caching the image failed.');
				}
			}
		);
	}

	public isResized(params: CacheServiceModel): boolean {
		const data = fs
			.readFileSync(PATH.CACHE_FOLDER + '/resized-images.txt', {
				flag: 'a+',
			})
			.toString();
		const bool = data.includes(
			`${params.name}-${params.width}x${params.height}.jpg`
		);
		if (bool) {
			log.info('ImageServices.isResized()', 'Image found in cache!');
		}
		return bool;
	}
}

export default new ImageServices();

import sharp = require('sharp');
import log from '../utilities/log';
import * as fs from 'fs';
import { PATH } from '../constants/path';
import { readdir, readFile } from 'node:fs/promises';

interface ResizeServiceModel {
	source: string;
	target: string;
	width: number;
	height: number;
}

export interface CacheServiceModel {
	name: string;
	width: string;
	height: string;
}

class ImageServices {
	constructor() {
		this.onCacheInit();
	}

	private onCacheInit(): void {
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
		fs.mkdir(PATH.IMAGE_FOLDER_THUMB, { recursive: true }, (err) =>
			log.error('imageServices.resize()', err)
		);
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

	public async isResized(params: CacheServiceModel): Promise<boolean | void> {
		try {
			const cache = await readFile(PATH.CACHE_FOLDER + '/resized-images.txt', {
				flag: 'a+',
			});
			const isCached = cache.includes(
				`${params.name}-${params.width}x${params.height}.jpg`
			);
			isCached &&
				log.info('ImageServices.isResized()', 'Image found in cache!');
			return isCached;
		} catch (error) {
			log.error('imageServices.isResized()', 'Cannot check image cache!');
		}
	}

	public async isImageExist(name: string): Promise<boolean | void> {
		try {
			const files = await readdir(PATH.IMAGE_FOLDER_FULL);
			const found = files.find((image: string) => image.includes(name));
			return Boolean(found);
		} catch (error) {
			log.error('ImageServices.isImageExist()', error);
		}
	}

	public async isValidNumber(num: unknown): Promise<boolean | void> {
		if (isNaN(<number>num)) {
			return false;
		}
		return <number>num > 0;
	}
}

export default new ImageServices();

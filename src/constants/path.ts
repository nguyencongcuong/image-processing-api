import * as path from 'path';

export const PATH = {
	IMAGE_FOLDER_FULL: path.normalize(`${__dirname}/../../public/images/full`),
	IMAGE_FOLDER_THUMB: path.normalize(`${__dirname}/../../public/images/thumb`),
	CACHE_FOLDER: path.normalize(`${__dirname}/../../.cache`),
	ROOT: path.normalize(`${__dirname}/../../`),
};

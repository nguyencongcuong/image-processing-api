import * as path from 'path';

interface PathModel {
	ROOT: string;
	IMAGE_FOLDER_FULL: string;
	IMAGE_FOLDER_THUMB: string;
	CACHE_FOLDER: string;
}

export const PATH: PathModel = {
	ROOT: path.normalize(`${__dirname}/../../`),
	IMAGE_FOLDER_FULL: path.normalize(`${__dirname}/../../public/images/full`),
	IMAGE_FOLDER_THUMB: path.normalize(`${__dirname}/../../public/images/thumb`),
	CACHE_FOLDER: path.normalize(`${__dirname}/../../.cache`),
};

import * as path from 'path';

interface PathModel {
	ROOT: string;
	IMAGE_FOLDER_FULL: string;
	IMAGE_FOLDER_THUMB: string;
	CACHE_FOLDER: string;
}

const ROOT = path.resolve('./');

export const PATH: PathModel = {
	ROOT,
	IMAGE_FOLDER_FULL: path.join(ROOT, './public/images/full'),
	IMAGE_FOLDER_THUMB: path.join(ROOT, './public/images/thumb'),
	CACHE_FOLDER: path.join(ROOT, '.cache/'),
};

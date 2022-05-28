import request = require('supertest');
import app from '../../index';

describe('GET /images/size', () => {
	it('should response with status 404 when image not found', async function () {
		const apiURL = '/images/size?name=jordd&width=500&height=500';
		const response = await request(app).get(apiURL);
		expect(response.statusCode).toEqual(404);
	});

	it('should includes a specific message when inputting invalid query', async function () {
		const apiURL = '/images/size?name=fjord&width-500&height-500';
		const response = await request(app).get(apiURL);
		expect(response.text).toMatch(
			'Something is wrong with your query. Please check again:'
		);
	});
});

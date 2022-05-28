import request = require('supertest');
import app from '../../index';

describe('GET /images/size', () => {
	it('should response with status 404 when image not found', async function () {
		const apiURL = '/images/size?name=jordd&width=500&height=500';
		const response = await request(app).get(apiURL);
		expect(response.status).toEqual(404);
	});

	it('should response with json with error message when inputting invalid query', async function () {
		const apiURL = '/images/size?name=fjord&width-500&height=500';
		const response = await request(app).get(apiURL);
		expect(response.body.message).toEqual('Resize failed. Check your query!');
	});
});

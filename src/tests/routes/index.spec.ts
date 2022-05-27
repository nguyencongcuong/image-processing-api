import request = require('supertest')
import app from '../../index';

describe('GET /', function() {
	it('should response with status 200', async function() {
		const response = await request(app).get('/')
		expect(response.status).toEqual(200);
	});
});
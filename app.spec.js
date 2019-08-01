const request = require('supertest');
const app = require('./app');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const objects = require('./data/data');

describe('Server', () => {
  beforeEach(async () => {
    await database.seed.run()
  })

  describe('GET /objects', () => {
    it('should return a status of 200 if OK', async () => {
      const response = await request(app).get('/api/v1/objects');

      expect(response.status).toBe(200)
    })

    it('should return all of the objects in the DB if the response is OK', async () => {
      const expectedObjects = objects.length;

      const response = await request(app).get('/api/v1/objects');
      const results = response.body;

      expect(results.length).toEqual(expectedObjects)
    })
  })
})
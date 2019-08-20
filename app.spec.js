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
      const expected = Object.keys(response.body.data).reduce((total, category) => {
        return total += Object.keys(response.body.data[category]).length
      }, 0);

      expect(expected).toEqual(expectedObjects)
    })
  })

  describe('GET /objects/:id/images', () => {
    it('should return a status of 200 if OK', async () => {
      const firstObject = await database('objects').first();
      const id = firstObject.id

      const response = await request(app).get(`/api/v1/objects/${id}/images`);

      expect(response.status).toBe(200);
    })

    it('should return a status of 404 if not OK', async () => {
      const id = -1;
      const response = await request(app).get(`/api/v1/objects/${id}/images`);

      expect(response.status).toBe(404);
    })

    it('should return all of the images for an object in the DB if the response is OK', async () => {
      const expectedImages = objects[1].images.length;
      const foundObject = await database('objects').where('name', 'Earth');
      const id = foundObject[0].id;

      const response = await request(app).get(`/api/v1/objects/${id}/images`);
      const results = response.body;

      expect(results.length).toEqual(expectedImages);
    })
  })

  describe('GET /images', () => {
    it('should return a status of 200 if OK', async () => {
      const response = await request(app).get('/api/v1/images');

      expect(response.status).toBe(200);
    })

    it('should return all of the images in the DB if the response is OK', async () => {
      const expectedImages = await database('images').select()
      
      const response = await request(app).get('/api/v1/images');
      const results = response.body;

      expect(results.length).toEqual(expectedImages.length)
    })
  })

  describe('POST /images', () => {
    it('should return a status of 200 if OK', async () => {
      const newImage = [{
        name: 'sun',
        imageId: '12345'
      }];
      const response = await request(app).post('/api/v1/images').send(newImage);

      expect(response.status).toBe(200);
    })

    it('should return a status of 422 if post body is not formatted correctly', async () => {
      const newImage = [{
        nameIsWrong: 'sun',
        imageId: '12345'
      }];
      const response = await request(app).post('/api/v1/images').send(newImage);

      expect(response.status).toBe(422);
    })

    it('should return a status of 404 if the corresponding object is not in the database', async () => {
      const newImage = [{
        name: 'Not A Planet',
        imageId: '12345'
      }];
      const response = await request(app).post('/api/v1/images').send(newImage);

      expect(response.status).toBe(404);
    })

    it('should post a new image', async () => {
      const newImage = [{
        name: 'sun',
        imageId: '12345'
      }];
      const response = await request(app).post('/api/v1/images').send(newImage);
      const result = response.body

      expect(result.name).toBe(newImage[0].name);
      expect(result.imageId).toBe(newImage[0].imageId);
    })
  });
})
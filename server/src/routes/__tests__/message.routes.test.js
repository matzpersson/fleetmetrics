
import "babel-polyfill";

const mongoose = require('mongoose');
const app = require('../../services/api');
const supertest = require('supertest')
const request = supertest(app)

describe('Message Router Tests', () => {
  beforeAll(async () => {
    jest.setTimeout(20000);
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  it('GET /api/assets', async done => {
    const response = await request.get('/api/messages')

    expect(response.status).toBe(200)
    // expect(response.body.message).toBe('pass!')
    done()
  })
})
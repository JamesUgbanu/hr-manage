import request from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
/**
 * Testing user endpoint
 */
describe('Test user endpoints', () => {
  describe('retrieve users endpoint', () => {
    it('should return all existing products', (done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).to.equal('Welcome to the homepage');
          done();
        });
    });
  });
  describe('add user endpoint', () => {
    it('should add a new user', (done) => {
      request(app)
        .post('/api/v1/auth/addUser')
        .send({
          firstName: 'James',
          lastName: 'Doe',
          email: 'johndoe@gmail.com'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.data.email).to.equal('johndoe@gmail.com');
          done();
        });
    });
  });
});

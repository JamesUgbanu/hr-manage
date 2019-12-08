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
});

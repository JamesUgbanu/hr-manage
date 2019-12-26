import request from 'supertest';
import chai from 'chai';
import app from '../../app';
import { application } from 'express';

const { expect } = chai;
/**
 * Testing user endpoint
 */
describe('Test user endpoints', () => {
  describe('retrieve users endpoint', () => {
    it('should return all existing products', done => {
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
  //Retrieve all users
  it('It should get all users', done => {
    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body.message).to.equal('retrieve all users successfully');
        done();
      });
  });
  //Retrieve a single user
  it('It should get a single user', done => {
    const id = 1;
    request(app)
      .get(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body.message).to.equal(
          'retrieve a single user successfully'
        );
        done();
      });
  });
});

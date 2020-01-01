import request from 'supertest';
import chai from 'chai';
import app from '../../app';
import { application } from 'express';

const { expect } = chai;
/**
 * Testing leave requests endpoint
 */
describe('Test leave requests endpoints', () => {
  describe('retrieve leave requests endpoint', () => {
    it('should return all existing leave requests', done => {
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

  //Create a new leave request
  it('It should create a new leave request', done => {
    const leave = {
      duration: '4',
      start_date: '2019-07-20 13:12:29',
      end_date: '2019-07-25 13:12:29',
      leave_type: 'sick leave',
      description: 'sick leave',
      status: 'pending'
    };
    request(app)
      .post('/api/v1/leaverequests')
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('It should not create leave request with incomplete parameters', done => {
    const leave = {
      duration: '4',
      start_date: '2019-07-20 13:12:29',
      end_date: '2019-07-25 13:12:29',
      leave_type: 'sick leave',
      description: 'sick leave'
    };
    request(app)
      .post('/api/v1/leaverequests')
      .set('Accept', 'application/json')
      .send(leave)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please provide complete details');
        done();
      });
  });

  /* Leave Request Test */
  it('It should get all leave requests', done => {
    request(app)
      .get('/api/v1/leaverequests')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body.message).to.equal(
          'retrieve all leave requests successfully'
        );
        done();
      });
  });
});

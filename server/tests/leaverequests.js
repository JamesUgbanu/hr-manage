import request from 'supertest';
import chai from 'chai';
import app from '../../app';
import { application } from 'express';

const { expect } = chai;
let taskId;
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
      duration: 4,
      start_date: '2019-07-20 13:12:29',
      end_date: '2019-07-25 13:12:29',
      leave_type: 'sick leave',
      description: 'sick leave',
      status: 'pending'
    };
    request(app)
      .post('/api/v1/leaverequests')
      .set('Accept', 'application/json')
      .send(leave)
      .end((err, res) => {
        taskId = res.body.data[0].leave_id;
        expect(res.body.message).to.equal(
          'A new leave requests created successfully'
        );
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('It should get a single leave request', done => {
    //const id = '';
    request(app)
      .get(`/api/v1/leaverequests/${taskId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal(
          'get single leave request successfully'
        );
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

  it('It should update leave request', done => {
    // const id = '0bd16bf2-e389-4719-882c-c02337122827';
    const updatedLeave = {
      duration: 10,
      start_date: '2019-07-20 13:12:29',
      end_date: '2019-07-25 13:12:29',
      leave_type: 'leave',
      description: 'leave',
      status: 'pending'
    };
    request(app)
      .put(`/api/v1/leaverequests/${taskId}`)
      .set('Accept', 'application/json')
      .send(updatedLeave)
      .end((err, res) => {
        expect(res.body.message).to.equal('Update leave request successfully');
        done();
      });
  });

  it('It should not update leave request with invalid id', done => {
    const id = '0bd16bf2-e389-4719-882c-c02337122827';
    const updatedLeave = {
      duration: 10,
      start_date: '2019-07-20 13:12:29',
      end_date: '2019-07-25 13:12:29',
      leave_type: 'leave',
      description: 'leave',
      status: 'pending'
    };
    request(app)
      .put(`/api/v1/leaverequests/${id}`)
      .set('Accept', 'application/json')
      .send(updatedLeave)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        `Cannot find leave request with the id ${id}`;
        done();
      });
  });
});

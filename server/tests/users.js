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

  //Create a new user
  it('It should create a new user', done => {
    const user = {
      firstName: 'james',
      lastName: 'Ugbanu',
      email: 'jamesugbanu1@gmail.com'
    };
    request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 2,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email
        });
        done();
      });
  });

  //Create a new leave request
  /* it('It should create a new leave request', done => {
    const leave = {
      duration: '5',
      start_date: '2019-07-20 13:12:29',
      end_date: '2019-07-25 13:12:29',
      leave_type: 'casual',
      description: 'casual leave',
      status: 'pending'
    };
    request(app)
      .post('/api/v1/leaverequests')
      .set('Accept', 'application/json')
      .send(leave)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          user_id: leave.user_id,
          duration: leave.duration,
          start_date: leave.start_date,
          end_date: leave.end_date,
          leave_type: leave.leave_type,
          description: leave.description,
          status: leave.status
        });
        done();
      });
  }); */

  /*  it('It should not create a user with incomplete parameters', done => {
    const user = {
      firstName: 'tunde',
      lastName: 'babatunde',
      email: ''
    };
    request(app)
      .post('/api/v1/createUser')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  }); */

  it('It should update user', done => {
    const id = 1;
    const updatedUser = {
      id: id,
      firstName: 'james',
      lastName: 'Ugbanu',
      email: 'jamesugbanu@gmail.com'
    };
    request(app)
      .put(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .send(updatedUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Update Successfully');
        done();
      });
  });
});

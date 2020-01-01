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
        expect(res.body).to.be.an('object');
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('first_name');
        expect(res.body.data[0]).to.have.property('last_name');
        expect(res.body.data[0]).to.have.property('email');
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

  it('It should not get user with invalid id', done => {
    const id = 8888;
    request(app)
      .get(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(`Cannot find user with the id ${id}`);
        done();
      });
  });

  it('It should not get user with non-numeric id', done => {
    const id = 'aaa';
    request(app)
      .get(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please input a valid numeric value');
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
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('A new user created successfully');
        /* expect(res.body.data).to.include({
          id: 1,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email
        }); */
        done();
      });
  });

  it('It should not create a user with incomplete parameters', done => {
    const user = {
      firstName: 'james',
      lastName: 'Ugbanu',
      email: ''
    };
    request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

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

  it('It should not update a user with invalid id', done => {
    const id = '9999';
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
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(`Cannot find user with the id ${id}`);
        done();
      });
  });

  it('It should not update a user with non-numeric id value', done => {
    const id = 'ggg';
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
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please input a valid numeric value');
        done();
      });
  });

  it('It should delete a user', done => {
    const id = 1;
    request(app)
      .delete(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User deleted successfully');
        done();
      });
  });
  it('It should not delete a user with non-numeric id', done => {
    const id = 'tt';
    request(app)
      .delete(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  //Create a new leave request
  // it('It should create a new leave request', done => {
  //   const leave = {
  //     duration: '4',
  //     start_date: '2019-07-20 13:12:29',
  //     end_date: '2019-07-25 13:12:29',
  //     leave_type: 'sick leave',
  //     description: 'sick leave',
  //     status: 'pending'
  //   };
  //   request(app)
  //     .post('/api/v1/leaverequests')
  //     .set('Accept', 'application/json')
  //     .send(leave)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(201);
  //       expect(res.body).to.be.an('object');
  //       expect(res.body.message).to.equal(
  //         'A new leave requests created successfully'
  //       );
  //       /*  expect(res.body.data).to.include({
  //         user_id: '08945f72-488f-4dfb-8e6f-ff008bf30fb6',
  //         duration: leave.duration,
  //         start_date: leave.start_date,
  //         end_date: leave.end_date,
  //         leave_type: leave.leave_type,
  //         description: leave.description,
  //         status: leave.status
  //       }); */
  //       done();
  //     });
  // });

  // it('It should create leave request with incomplete parameters', done => {
  //   const leave = {
  //     duration: '4',
  //     start_date: '2019-07-20 13:12:29',
  //     end_date: '2019-07-25 13:12:29',
  //     leave_type: 'sick leave',
  //     description: 'sick leave'
  //   };
  //   request(app)
  //     .post('/api/v1/leaverequests')
  //     .set('Accept', 'application/json')
  //     .send(leave)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       expect(res.body).to.be.an('object');
  //       expect(res.body.message).to.equal('Please provide complete details');
  //       done();
  //     });
  // });

  /* Leave Request Test */
  /* it('It should get all leave requests', done => {
    request(app)
      .get('/api/v1/leaverequests')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body.message).to.equal(
          'retrieve all leave requests successfully'
        );
        done();
      });
  }); */
});

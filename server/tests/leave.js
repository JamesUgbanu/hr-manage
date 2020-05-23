import request from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;

let token;

before((done) => {
  request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'max@gmail.com',
      password: 'password',
    })
    .end((error, response) => {
      token = response.header['auth-token'];
      done();
    });
});

describe('Test leave  endpoints', () => {
  describe('retrieve users endpoint', () => {
    it('should return the homepage', (done) => {
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

  //   it('should create a new leave request', (done) => {
  //     const leaverequest = {
  //       duration: 10,
  //       start_date: '2019-07-20T00:00:00.000Z',
  //       end_date: '2019-07-20T00:00:00.000Z',
  //       leave_type: 'casual',
  //       description: 'casual leave',
  //     };
  //     request(app)
  //       .post('/api/v1/leaverequests')
  //       .send(leaverequest)
  //       .end((err, res) => {
  //         // console.log(res.body);
  //         expect(res.status).to.equal(201);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.success).to.equal(true);
  //         expect(res.body.message.description).to.equal(leaverequest.description);

  //         /*
  //       expect(response.body.errors[0].msg).to.equal('Enter a valid email'); */
  //         done();
  //       });
  //   });
  //
  it('It should get all leave requests', (done) => {
    request(app)
      .get('/api/v1/getleaverequests')
      .set('Accept', 'application/json')
      .set('auth-token', token)
      .end((err, res) => {
        //console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
        // expect(res.body.message).to.equal(
        //   'retrieve leave requests successfully'
        // );

        done();
      });
  });

  it('It should not get all leave requests without token', (done) => {
    request(app)
      .get('/api/v1/getleaverequests')
      .set('Accept', 'application/json')
      .set('auth-token', '')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Access Denied');

        done();
      });
  });

  it('It should not get all leave requests with invalid token', (done) => {
    request(app)
      .get('/api/v1/getleaverequests')
      .set('Accept', 'application/json')
      .set('auth-token', 'gggg')
      .end((err, res) => {
        // console.log(res.body);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Invalid Token');

        done();
      });
  });
  // .set('auth-token', token)
  it('It should get single leave request', (done) => {
    request(app)
      .get('/api/v1/getleaverequests/bb7fad2c-0ff3-4d98-a4a6-b616b7b0ca85')
      .set('Accept', 'application/json')
      .end((err, res) => {
        //console.log(res.body.message.duration);
        expect(res.body).to.be.an('object');
        expect(res.body.message.duration).to.equal(2);

        done();
      });
  });
  //.set('auth-token', token)
  it('It should not get single leave request with invalid id', (done) => {
    request(app)
      .get('/api/v1/getleaverequests/bb7fad2c-0ff3-4d98-a4a6-b616b7b0ca8')
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(res.body.message);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Not found');

        done();
      });
  });

  //   it('should not login a user with an invalid password ', (done) => {
  //     request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: 'tunde@gmail.com',
  //         password: 'passwordjj',
  //       })
  //       .end((error, res) => {
  //         expect(res.status).to.equal(400);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.success).to.equal(false);
  //         expect(res.body.message).to.equal('Invalid password');
  //         done();
  //       });
  //   });

  //   it('should not login a user with an empty email ', (done) => {
  //     request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: '',
  //         password: 'password',
  //       })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.success).to.equal(false);
  //         expect(res.body.message).to.equal('"email" is not allowed to be empty');

  //         done();
  //       });
  //   });

  //   it('should not login a user with an empty password ', (done) => {
  //     request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: 'tunde@gmail.com',
  //         password: '',
  //       })
  //       .end((error, res) => {
  //         // console.log(res.body);
  //         expect(res.status).to.equal(400);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.success).to.equal(false);
  //         expect(res.body.message).to.equal(
  //           '"password" is not allowed to be empty'
  //         );

  //         done();
  //       });
  //   });
});

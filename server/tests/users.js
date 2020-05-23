import request from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;

/**
 * Testing user endpoint
 */

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
      //console.log(token);
      done();
    });
});
describe('Test user endpoints', () => {
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

  /* it('POST /api/v1/auth/register/: Should create a new user account.', (done) => {
    const user = {
      first_name: 'seliyat5',
      last_name: 'seliyat5',
      email: 'seliyat5@gmail.com',
      password: 'password',
    };
    request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        // expect(res.body).to.be.an('object');
        // expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.email).to.equal(user.email);

        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('first_name');
        expect(res.body).to.have.property('last_name');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('password');
        done();
      });
  }); */

  it('should not register a user with an existing email address', (done) => {
    const user = {
      first_name: 'tmbabatunde',
      last_name: 'tmbabatunde',
      email: 'tmbabatunde@gmail.com',
      password: 'password',
      is_admin: false,
    };
    request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        //console.log(res.body);
        //expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Email already exist');
        done();
      });
  });

  it('should not register a user with empty first name', (done) => {
    const user = {
      first_name: '',
      last_name: 'tmbabatunde',
      email: 'tmbabatunde@gmail.com',
      password: 'password',
    };
    request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        //console.log(res.status);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(
          '"first_name" is not allowed to be empty'
        );
        done();
      });
  });

  it('should not register a user with empty last name', (done) => {
    const user = {
      first_name: 'tmbabatunde',
      last_name: '',
      email: 'tmbabatunde@gmail.com',
      password: 'password',
    };
    request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        //console.log(res.body);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(
          '"last_name" is not allowed to be empty'
        );
        done();
      });
  });

  it('should not register a user with empty email address', (done) => {
    const user = {
      first_name: 'tmbabatunde',
      last_name: 'tmbabatunde',
      email: '',
      password: 'password',
    };
    request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        //console.log(res.body);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('"email" is not allowed to be empty');
        done();
      });
  });

  it('should not register a user with invalid email address', (done) => {
    const user = {
      first_name: 'tmbabatunde',
      last_name: 'tmbabatunde',
      email: 'tmbabatunde',
      password: 'password',
    };
    request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        //console.log(res.body);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('"email" must be a valid email');
        done();
      });
  });

  it('should not register a user with empty password', (done) => {
    const user = {
      first_name: 'tmbabatunde',
      last_name: 'tmbabatunde',
      email: 'tmbabatunde@gmail.com',
      password: '',
    };
    request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        //console.log(res.body);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(
          '"password" is not allowed to be empty'
        );
        done();
      });
  });

  it('POST /api/v1/auth/login/: Should log a user in.', (done) => {
    const user = {
      email: 'tmbabatunde@gmail.com',
      password: 'password',
    };
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        //console.log(res.body);
        // expect(res.status).to.equal(201);
        //expect(res.body.success).to.equal(true);

        done();
      });
  });

  // it('it should not login a user with incorrect or empty token', (done) => {
  //   const user = {
  //     email: 'tunde@gmail.com',
  //     password: 'password',
  //   };
  //   request(app)
  //     .post('/api/v1/auth/login')
  //     .set('Accept', 'application/json')
  //     .set('auth-token', token)
  //     .send(user)
  //     .end((err, res) => {
  //       console.log(res.body);
  //       // expect(res).to.have.status(401);
  //       // expect(res.body).to.be.an('object');
  //       // expect(res.body.error).to.equal('not authenticated');
  //       done();
  //     });
  // });

  it('should not login an unregistered user', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'michael@gmail.com',
        password: 'johnson123',
      })
      .end((err, res) => {
        //console.log(res.status);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Invalid credentials');
        done();
      });
  });

  it('should not login a user with an invalid email address', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '@gmail',
        password: 'ghhhh$i0sdf',
      })
      .end((err, res) => {
        // console.log(res.status);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('"email" must be a valid email');
        /*
        expect(response.body.errors[0].msg).to.equal('Enter a valid email'); */
        done();
      });
  });

  it('should not login a user with an invalid password ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tunde@gmail.com',
        password: 'passwordjj',
      })
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Invalid credentials');
        done();
      });
  });

  it('should not login a user with an empty email ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '',
        password: 'password',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('"email" is not allowed to be empty');

        done();
      });
  });

  it('should not login a user with an empty password ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tunde@gmail.com',
        password: '',
      })
      .end((error, res) => {
        // console.log(res.body);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(
          '"password" is not allowed to be empty'
        );

        done();
      });
  });

  /* it('It should create a new user', async () => {
    const user = {
      first_name: 'zaynab',
      last_name: 'zaynab',
      email: 'zaynab@gmail.com',
      password: 'password',
    };
    let res = await request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .send(user);
    expect(res).to.be.a('object');
  });

  it('It should login user', async () => {
    const user = {
      email: 'zaynab@gmail.com',
      password: 'password',
    };
    let res = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(user);
    expect(res).to.be.a('object');
    expect(res.status).to.equal(200);
  }); */

  /* USERS ENDPOINT */
  //
  it('It should get all users', (done) => {
    request(app)
      .get('/api/v1/auth/getallusers')
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

  it('It should get a single user', (done) => {
    request(app)
      .get('/api/v1/auth/getuser/89')
      .set('Accept', 'application/json')
      .set('auth-token', token)
      .end((err, res) => {
        //console.log(res.body);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message.first_name).to.equal('max');

        done();
      });
  });

  it('It should not get user with invalid id', (done) => {
    request(app)
      .get('/api/v1/auth/getuser/18')
      .set('Accept', 'application/json')
      .set('auth-token', token)
      .end((err, res) => {
        //console.log(res.body.message);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User not found');

        done();
      });
  });

  it('It should get current logged in user', (done) => {
    request(app)
      .get('/api/v1/auth/getcurrentuser')
      .set('Accept', 'application/json')
      .set('auth-token', token)
      .end((err, res) => {
        //console.log(res.body.message);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
        // expect(res.body.message).to.equal(
        //   'retrieve leave requests successfully'
        // );

        done();
      });
  });
});

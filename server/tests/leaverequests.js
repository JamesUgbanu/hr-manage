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

  // Retrieve all leave requests
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

  // test for when all inputs are supplied correctly
  it('should create new leave request when complete information is supplied', done => {
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
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.message).to.equal(
          'A new leave requests created successfully'
        );
        done();
      });
  });

  //Retrieve a single request
  it('It should get a single leave request', done => {
    // const id = '7bb12d19-1138-478c-8f50-832039c62b29';
    request(app)
      .get(`/api/v1/leaverequests/${taskId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(res.body);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal(
          'get single leave request successfully'
        );
        done();
      });
  });

  // test for empty duration
  it('should request for duration when its not supplied', done => {
    const leave = {
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
        /*  console.log(res.body.errors[0].msg); */
        expect(res.body.errors[0].msg).to.equal('Duration is required');
        done();
      });
  });

  // test for duration value
  it('should request for duration when its not supplied', done => {
    const leave = {
      duration: 'ggg',
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
        /* console.log(res.body.errors[0].msg); */
        expect(res.body.errors[0].msg).to.equal('Duration should be numeric');
        done();
      });
  });

  // test for empty start date
  it('should request for end date when its not supplied', done => {
    const leave = {
      duration: 4,
      end_date: '2019-07-25 13:12:29',
      leave_type: 'sick leave',
      description: 'sick leave'
    };
    request(app)
      .post('/api/v1/leaverequests')
      .set('Accept', 'application/json')
      .send(leave)
      .end((err, res) => {
        /* console.log(res.body.errors[0].msg); */
        expect(res.body.errors[0].msg).to.equal('Start date is required');
        done();
      });
  });

  // test for empty end date
  it('should request for start date when its not supplied', done => {
    const leave = {
      duration: 4,
      start_date: '2019-07-20 13:12:29',
      leave_type: 'sick leave',
      description: 'sick leave'
    };
    request(app)
      .post('/api/v1/leaverequests')
      .set('Accept', 'application/json')
      .send(leave)
      .end((err, res) => {
        /*  console.log(res.body.errors[0].msg); */
        expect(res.body.errors[0].msg).to.equal('End date is required');
        done();
      });
  });

  // test for empty leave type
  it('should request for leave type when its not supplied', done => {
    const leave = {
      duration: 4,
      start_date: '2019-07-20 13:12:29',
      end_date: '2019-07-20 13:12:29',
      description: 'sick leave'
    };
    request(app)
      .post('/api/v1/leaverequests')
      .set('Accept', 'application/json')
      .send(leave)
      .end((err, res) => {
        /* console.log(res.body.errors[0].msg); */
        expect(res.body.errors[0].msg).to.equal('Leave type is required');
        done();
      });
  });

  // test for empty description
  it('should request for description when its not supplied', done => {
    const leave = {
      duration: 4,
      start_date: '2019-07-20 13:12:29',
      end_date: '2019-07-20 13:12:29',
      leave_type: 'sick leave'
    };
    request(app)
      .post('/api/v1/leaverequests')
      .set('Accept', 'application/json')
      .send(leave)
      .end((err, res) => {
        /* console.log(res.body.errors[0].msg); */
        expect(res.body.errors[0].msg).to.equal('Description is required');
        done();
      });
  });

  // test should check the length of description
  it('should check the length of description', done => {
    const leave = {
      duration: 4,
      start_date: '2019-07-20 13:12:29',
      end_date: '2019-07-20 13:12:29',
      leave_type: 'sick leave',
      description:
        'dhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhdddddddddddddddddddddddhddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
    };
    request(app)
      .post('/api/v1/leaverequests')
      .set('Accept', 'application/json')
      .send(leave)
      .end((err, res) => {
        /* console.log(res.body.errors[0].msg); */
        expect(res.body.errors[0].msg).to.equal(
          'Description should be less than 40 char'
        );
        done();
      });
  });

  // test for any special character in description
  it('should request for removal of special characters', done => {
    const leave = {
      duration: 4,
      start_date: '2019-07-20 13:12:29',
      end_date: '2019-07-20 13:12:29',
      leave_type: 'sick leave',
      description: 'sick leave =+ #@',
      status: 'ongoing'
    };
    request(app)
      .post('/api/v1/leaverequests')
      .set('Accept', 'application/json')
      .send(leave)
      .end((err, res) => {
        /* console.log(res.body.errors[0].msg); */
        expect(res.body.errors[0].msg).to.equal(
          'Description should be alphanumeric'
        );
        done();
      });
  });

  //Update leave request status
  it('It should update leave request status ', done => {
    // const id = '2144aa4b-e476-42de-a912-0659f44ece2b';
    const updatedLeaveStatus = {
      status: 'pending'
    };
    request(app)
      .put(`/api/v1/leaverequests/${taskId}`)
      .set('Accept', 'application/json')
      .send(updatedLeaveStatus)
      .end((err, res) => {
        expect(res.body.message).to.equal(
          'Update leave request status successfully'
        );
        done();
      });
  });
  //Create a new leave request
  /*  it('It should create a new leave request', done => {
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
  }); */
  /* 
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
  }); */
  /* Leave Request Test */
  /*  it('It should get all leave requests', done => {
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

  /* it('It should not create leave request with incomplete parameters', done => {
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
  }); */

  /* it('It should update leave request', done => {
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
  */

  // Update leave status test
  /* it('It should update leave request status ', done => {
    //const id = '3c28e58e-4d08-4d0f-8869-c1fc38a8b4d5';
    const updatedLeaveStatus = {
      status: 'pending'
    };
    request(app)
      .put(`/api/v1/leaverequests/${taskId}`)
      .set('Accept', 'application/json')
      .send(updatedLeaveStatus)
      .end((err, res) => {
        expect(res.body.message).to.equal(
          'Update leave request status successfully'
        );
        done();
      });
  }); */

  /*  it('It should not update leave request status', done => {
    const id = '3c28e58e-4d08-4d0f-8869-c1fc38a8b4d5';
    const updatedLeaveStatus = {
      status: 'approved'
    };
    request(app)
      .put(`/api/v1/leaverequests/${id}`)
      .set('Accept', 'application/json')
      .send(updatedLeaveStatus)
      .end((err, res) => {
        expect(res.body.message).to.equal('Error occurs Please try again');
        done();
      });
  }); */
});

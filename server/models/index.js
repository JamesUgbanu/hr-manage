import createQuery from './tables.create';
import destroyQuery from './db.destroy';
import connection from '../helpers/conn';

const client = connection();
client.connect();

const adminQuery = `INSERT INTO users(first_name, last_name, email, password) VALUES 
('james', 'Ugbanu', 'jamesugbanu@gmail.com', 'jamesugbanu1@gmail.com') RETURNING *;`;
// const userQuery = `INSERT INTO users(first_name, last_name, email, password, is_admin) VALUES
// ('james', 'Ugbanu', 'jamesugbanu2@gmail.com', '${adminPassword}', false) RETURNING *;`;
// const task = `INSERT INTO tasks(user_id, task_name, due_date, description, assignee) VALUES
// (1, 'Update website', '2019-07-20 13:12:29', 'Remove content from header and place it below', 2) RETURNING *`;
const leaveRequestQuery = `INSERT INTO leaverequests(duration, start_date, end_date, leave_type, description, status) VALUES ('5', '2019-07-20 13:12:29', '2019-07-25 13:12:29', 'casual' , 'casual leave', 'pending') RETURNING *;`;

const dbQueries = `${destroyQuery}${createQuery}${adminQuery}${leaveRequestQuery}`;

// console.log(dbQueries);
client.query(dbQueries, (err, res) => {
  // console.log(err);
  client.end();
});

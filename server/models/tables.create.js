const createUserTable = `
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(40) NOT NULL,
  last_name VARCHAR(40) NOT NULL,
  email VARCHAR(30) NOT NULL,
  password VARCHAR(100),
  address TEXT,
  join_date TIMESTAMP WITH TIME ZONE,
  birth_date TIMESTAMP WITH TIME ZONE,
  last_loggedin TIMESTAMP WITH TIME ZONE,
  role INTEGER,
  is_admin BOOLEAN DEFAULT false,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (email)
);
`;

const createLeaveRequestTable = `
  CREATE TABLE IF NOT EXISTS leaverequests(
    leave_id uuid DEFAULT uuid_generate_v4 (),
    duration INTEGER NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    leave_type VARCHAR(40),
    description TEXT,
    status VARCHAR(10) DEFAULT 'pending',
    created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
    PRIMARY KEY (leave_id)
  );
`;

const createQuery = `${createUserTable}${createLeaveRequestTable}`;

export default createQuery;

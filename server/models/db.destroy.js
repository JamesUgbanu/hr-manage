const createExt = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; ';
const userDestroy = 'DROP TABLE IF EXISTS users CASCADE; ';
const leaveTable = 'DROP TABLE IF EXISTS leaverequests CASCADE; ';

const destroyQuery = `${userDestroy}${leaveTable}${createExt}`;

export default destroyQuery;

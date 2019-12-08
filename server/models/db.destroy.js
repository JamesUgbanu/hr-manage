const createExt = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; ';
const userDestroy = 'DROP TABLE IF EXISTS users CASCADE; ';


const destroyQuery = `${userDestroy}${createExt}`;

export default destroyQuery;

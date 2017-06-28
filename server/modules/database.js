var pg = require('pg');
var pool;
var config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PW,
  schema: 'public',
  port: 5432,
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 15000, // 15s // how long a client is allowed to remain idle before being closed
};

if(!pool) { // is there a connection pool? if not, initialize one
  pool = new pg.Pool(config);
  console.log('pool created', pool);
}

module.exports = pool;
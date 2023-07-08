import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

const {HOST_URL, HOST, PORT, SQL_SERVER, SQL_PORT, SQL_USER, SQL_PWD, SQL_DB} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === 'true';

assert(PORT, 'Port is required');
assert(HOST, 'Host is required');

const config = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        database: SQL_DB,
        user: SQL_USER,
        password: SQL_PWD,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true
        }
    }
};




export default config;
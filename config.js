require('dotenv').config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVERPORT = process.env.SERVER_PORT || '3000';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVERPORT,
};
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

const SECRETS = {
    token: TOKEN_SECRET,
}

module.exports = {
    server: SERVER,
    secrets: SECRETS,
}

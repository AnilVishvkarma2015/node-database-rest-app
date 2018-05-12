const mysql = require('mysql');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo'
});

let connectionObject;

function createConnection() {
    pool.getConnection(function (err, connection) {
        if (err) {
            return;
        } else {
            connectionObject = connection;
            return connectionObject
        }
    });
}

function getDBSession() {
    if (connectionObject) {
        return connectionObject;
    } else {
        return createConnection();
    }
}

module.exports = {
    getDBSession: getDBSession
};

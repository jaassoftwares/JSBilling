const mysql = require("mysql");

var connection;

module.exports = {

    dbConnection: function () {

        connection = mysql.createConnection({
            host: "localhost",
            user: "rb_admin",
            password: "Rb_@dmin08",
            database: "jsbilling"
        });
        connection.connect();
        return connection;
    }

};

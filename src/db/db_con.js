var mysql = require('mysql');

var connection = mysql.createPool({
  host: "92.249.44.23",
  user: "u135893733_vueBank",
  password: "|4l4F5c0HC",
  database: 'u135893733_vueBank'
});

connection.getConnection(function (err) {
  if (err) throw err;
});

module.exports = connection;
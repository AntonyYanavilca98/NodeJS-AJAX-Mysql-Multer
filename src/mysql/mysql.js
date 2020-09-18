const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'bv7aymagf1ymlm2febfu-mysql.services.clever-cloud.com',
    user: 'uxbkbkubw1wbfonk',
    password: '1gEiNfzy3gZHiaoqwOIn',
    database: 'bv7aymagf1ymlm2febfu'
});

connection.connect((err) => {
    if (err) return console.log(err);
    console.log(`Conectado a la base de datos Mysql`)
})

module.exports = { connection }
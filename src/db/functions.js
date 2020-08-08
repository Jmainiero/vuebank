const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser

app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    next();
});



var db = require('./db_con');

app.post('/api/login', jsonParser, async (req, res) => {
    let user = null;
    db.query('SELECT password FROM accounts Where email = ?', req.body.user.email, async function (err, result) {
        if (err) throw err;
        user = (JSON.stringify(result[0]) == undefined) ? res.status(401).end('Account does not exist') : JSON.stringify(result[0].password);
        
        if (user == null) {
            return res.status(401).send('Invalid Username or Password');
        }

        try {
            user = user.substr(1);
            user = user.slice(0, -1);
            console.log(user);
            if (await bcrypt.compare(req.body.user.password, user)) {
                res.end('Success');
            } else {
                console.log(`${req.body.user.password} does not equal ${user}`);
                res.status('401').end('Invalid Username or Password');
            }

        } catch {
            res.status(500).send();
        }
    });

});

app.post('/api/postSignup', jsonParser, async (req, res) => {
    try {

        // console.log(req.body.formdata);
        const hashedPassword = await bcrypt.hash(req.body.formdata.password, 10);

        db.query(`INSERT INTO accounts(firstName, lastName,email,password,phoneNumber,address,city,state,zip) VALUES('${req.body.formdata.first}','${req.body.formdata.last}','${req.body.formdata.email}','${hashedPassword}',${req.body.formdata.phone},'${req.body.formdata.address}','${req.body.formdata.city}','${req.body.formdata.state}',${req.body.formdata.zip})`, function (err, result) {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') res.status(409).send('ERROR. Account Already Exits.');
                if (err && err.code != 'ER_DUP_ENTRY') throw err;

            }
            res.end();
        });

    } catch {
        res.status(500).send();
    }
});



app.post('/api/checking', jsonParser, async (req, res) => {
    try {

        // console.log(req.body.formdata);
        console.log(req.body.user.email);
        db.query(`SELECT * from accounts WHERE email = ?`, req.body.user.email, function (err, result) {
            if (err) throw err;
            console.log(result == '');
            res.end(JSON.stringify(result));
        });

    } catch {
        res.status(500).send();
    }
});

app.listen('3000', () => {
    console.log('Listening on 3000');
});
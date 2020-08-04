const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser

app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  
    next()
  })

app.listen('3000', ()=>{
    console.log('Listening on 3000');
});

var db = require('./db_con');

//Read Accounts
app.get('/api/listAccounts', (req,res) =>{
    db.query('SELECT * FROM accounts', function (err, result) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

//Write to Accounts
app.post('/api/postSignup', jsonParser,(req,res) =>{
    db.query(`INSERT INTO accounts(firstName, lastName,email,phoneNumber,address,city,state,zip) VALUES('${req.body.params.first}','${req.body.params.last}','${req.body.params.email}',${req.body.params.phone},'${req.body.params.address}','${req.body.params.city}','${req.body.params.state}',${req.body.params.zip})`, function (err, result) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
    // console.log(req.body);
});


// const list_a_Join = () => {
//     db.query('SELECT * FROM accounts JOIN bank_accounts WHERE accounts.accountId = bank_accounts.accountId;', function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.end();
//     });
// };



//TODO
//Look into AXIOS to pass VueJS to NodeJS and handle form completions for Signup + Login
//Create new columns for password, and unique user/account ids in database
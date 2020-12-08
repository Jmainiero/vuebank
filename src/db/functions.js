require('dotenv').config();
var db = require('../server/db_con');
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');

// create application/x-www-form-urlencoded parser
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});
const db_functions = require('./db_functions');


app.all('*', jsonParser, (req, res, next) => {
  console.log(req.body);
  const authTk = req.body.authTk;
  const email = req.body.user.username;
  if (authTk == null) {
    if (req.originalUrl === '/api/login' || req.originalUrl === '/api/logout') {
      next();
    } else {
      return res.sendStatus(401);
    }
  } else {

    db.query(`SELECT refreshToken FROM tokens WHERE email = ?`, email, function (err, result) {
      if (err) console.log(err);
      jwt.verify(result[0].refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) console.log(err);
        const accessToken = generateAccessToken({ name: user.name });
        console.log(accessToken);
        next();
      });
    });
  }
});

app.post('/api/postSignup', jsonParser, async (req, res) => {
  try {
    const results = await db_functions.postSignup(req.body.formdata.password, req);
    res.status(JSON.parse(results).code).end(JSON.parse(results).msg);

  } catch {
    res.status(500).send();
  }
});

app.post('/api/checking', jsonParser, async (req, res) => {
  try {

    console.log(req.body.user.email);
    const results = db_functions.checking(req.body.user.email);
    res.send(results);

  } catch {
    res.status(500).send();
  }
});

app.post('/ck_accountInfo', jsonParser, async (req, res) => {
  try {
    const results = await db_functions.ckAccountInfo(req.body.user);
    res.end(results);
  } catch {
    res.status(500).send();
  }
});
app.post('/sv_accountInfo', jsonParser, async (req, res) => {
  try {
    const results = await db_functions.svAccountInfo(req.body.user);
    res.end(results);
  } catch {
    res.status(500).end();
  }
});

//used to populate transaction table with misc data.
app.get('/ckGenerateTrans', async (req, res) => {
  const results = await db_functions.ckGenerateTrans();
  res.status(results.code).send(results.msg);
});

app.get('/svGenerateTrans', async (req, res) => {
  const results = await db_functions.svGenerateTrans();
  res.status(results.code).send(results.msg);
});

app.get('/updateBalance', async (req, res) => {
  const results = await db_functions.updateBalance();
  console.log(results);
  res.status(results.code).end(results.msg);
});


app.post(('/api/transfer'), jsonParser, async (req, res) => {
  const username = req.body.user;
  const toAmnt = req.body.transferdata.toAmnt;
  const toAcc = req.body.transferdata.toAcc;
  const results = await db_functions.transfer(toAcc, toAmnt, username, req.body);
  console.log(results.msg);
  res.status(results.code).end(results.msg);
});
app.post(('/ckTrans'), jsonParser, async (req, res) => {
  try {
    const results = await db_functions.getTransactions(req.body.user);
    console.log(results);
    res.end(results);
  } catch {
    res.status(500).send();
  }
});
//Migrated from auth.js
app.post('/api/token', (req, res) => {
  const refreshToken = req.body.user.token.toString();
  const email = req.body.user.email;
  if (refreshToken == null) return res.sendStatus(401);

  db.query(`SELECT refreshToken FROM tokens WHERE email = ?`, email, function (err, result) {
    if (err) throw err;
    jwt.verify(result[0].refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      console.log(user);
      if (err) throw err;
      const accessToken = generateAccessToken({ name: user.name });
      res.json({ accessToken: accessToken });
    });
  });

});

app.delete('/api/logout/', jsonParser, (req, res) => {
  console.log(req.body);
  const username = req.body.user.username;
  console.log('Logout: ' + username);
  db.query(`DELETE tokens FROM tokens WHERE tokens.email ='${username}'`, function (err) {
    if (err) throw err;

    res.status(204).end();
  });
});


/*This function relies on the db_con file have multiple statements enabled.

    multipleStatements: true,
*/
app.post('/api/login', jsonParser, (req, res) => {
  let userInput = null;
  console.log(req.body);
  const username = req.body.user.email;
  const authUser = { name: username };

  const accessToken = generateAccessToken(authUser);
  const refreshToken = jwt.sign(authUser, process.env.REFRESH_TOKEN_SECRET);

  db.query(`SELECT password from accounts where email = ?;
    INSERT INTO tokens(accountId, email, refreshToken) VALUES((SELECT accountId from accounts WHERE email = ?),'${username}', '${refreshToken}')`, [username, username], async function (err, result) {
    if (err) {
      if (err.code == 'ER_DUP_ENTRY') res.status(403).end('Error Duplicate Entry Found');
      console.log(err);
    }
    userInput = (JSON.stringify(result[0]) == undefined) ? res.status(401).end('Account does not exist') : JSON.stringify(result[0][0].password);
    if (userInput == null) {
      return res.status(401).send('Invalid Username or Password');
    }

    try {
      userInput = userInput.substr(1);
      userInput = userInput.slice(0, -1);
      if (await bcrypt.compare(req.body.user.password, userInput)) {
        res.send({ accessToken: accessToken, exp: process.env.ACCESS_TOKEN_LIFE });
      } else {
        console.log(`${req.body.user.password} does not equal ${userInput}`);
        res.status('401').end('Invalid Username or Password');
      }

    } catch {
      res.status(500).send();
    }
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE });
}
app.listen('3000', () => {
  console.log('Listening on 3000');
});

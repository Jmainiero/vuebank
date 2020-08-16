require('dotenv').config();
var db = require('./db_con');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(cors());

app.use(express.json());
var jsonParser = bodyParser.json();

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

app.delete('/api/logout/', (req, res) => {
  console.log(req.body);
  const username = req.body.email;
  console.log(username);
  db.query(`DELETE tokens FROM tokens WHERE tokens.email ='${username}'`, function (err) {
    if (err) throw err;

    res.status(204).end();
  });
});



app.post('/api/login', jsonParser, (req, res) => {
  let userInput = null;
  const username = req.body.user.email;
  const authUser = { name: username };

  const accessToken = generateAccessToken(authUser);
  const refreshToken = jwt.sign(authUser, process.env.REFRESH_TOKEN_SECRET);

  db.query(`SELECT password FROM accounts WHERE email = '${username}';
  INSERT INTO tokens(accountId, email, refreshToken) VALUES((SELECT accountId from accounts WHERE email = '${username}'),'${username}', '${refreshToken}')`, async function (err, result) {
    if (err) {
      if (err.code == 'ER_DUP_ENTRY') res.status(403).end('Error');
      throw err;

    }
    userInput = (JSON.stringify(result[0]) == undefined) ? res.status(401).end('Account does not exist') : JSON.stringify(result[0][0].password);

    if (userInput == null) {
      return res.status(401).send('Invalid Username or Password');
    }

    try {
      userInput = userInput.substr(1);
      userInput = userInput.slice(0, -1);
      if (await bcrypt.compare(req.body.user.password, userInput)) {
        res.send({ accessToken: accessToken});
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
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
}

app.listen(4000);

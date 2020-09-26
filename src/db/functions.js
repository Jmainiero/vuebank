const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    next();
});
const db_functions = require('./db_functions');

app.post('/api/postSignup', jsonParser, async (req, res) => {
    try {
        await db_functions.postSignup(req.body.formdata.password);
        res.end();

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
        res.end(results);
    } catch {
        res.status(500).send();
    }
});

app.listen('3000', () => {
    console.log('Listening on 3000');
});

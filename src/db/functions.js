const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

app.post('/api/postSignup', jsonParser, async (req, res) => {
    try {
        // console.log(req.body.formdata);
        const hashedPassword = await bcrypt.hash(req.body.formdata.password, 10);

        db.query(`INSERT INTO accounts(firstName, lastName,email,password,phoneNumber,address,city,state,zip) VALUES('${req.body.formdata.first}','${req.body.formdata.last}','${req.body.formdata.email}','${hashedPassword}',${req.body.formdata.phone},'${req.body.formdata.address}','${req.body.formdata.city}','${req.body.formdata.state}',${req.body.formdata.zip})`, function (err, result) {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') res.status(409).send('ERROR. Account Already Exits.');
                if (err && err.code != 'ER_DUP_ENTRY') throw err;

            }
            console.log(result);
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



app.get('/accountInfo', (req, res) => {
    try {
        db.query(`SELECT * FROM ck_bal WHERE accountId = (SELECT accountId from accounts WHERE email = ?)`, 'jcmainiero@gmail.com', function (err, result) {
            if (err) throw err;
            console.log(result == '');
            res.end(JSON.stringify(result));
        });

    } catch {
        res.status(500).send();
    }
});



//used to populate transaction table with misc data.
app.get('/generateTrans', (req, res) => {
    //Generate random list of transactions and post them into the database.
    var x = ["Walmart", "The Kroger Co.", "Amazon", "Costco", "The Home Depot", "Walgreens Boots Alliance", "CVS Health Corporation", "Target", "Lowe's Companies", "Albertsons Companies", "Royal Ahold Delhaize USA", "Apple Stores / iTunes", "Best Buy", "McDonald's", "Publix Super Markets", "TJX Companies", "Aldi", "Macy's", "Dollar General", "H-E-B Grocery", "Dollar Tree", "Rite Aid", "Kohl's", "Verizon Wireless", "YUM! Brands", "Meijer", "Ace Hardware", "Starbucks", "Wakefern / ShopRite", "Nordstrom", "Sears Holdings", "7-Eleven", "Ross Stores", "Subway", "AT&T Wireless", "Gap", "BJ's Wholesale Club", "J.C. Penney Co.", "Bed Bath & Beyond", "Qurate Retail Group (formerly QVC)", "L Brands", "Menard", "Southeastern Grocers", "Health Mart Systems", "Good Neighbor Pharmacy", "Hy-Vee", "AutoZone", "Alimentation Couche-Tard", "Wendy's", "Chick-fil-A", "Dunkin' Brands Group", "Giant Eagle", "O'Reilly Auto Parts", "Wegmans Food Market", "Burger King Worldwide", "Dick's Sporting Goods", "Darden Restaurants", "PetSmart", "Sherwin-Williams", "Staples", "Army & Air Force Exchange", "Bass Pro", "Tractor Supply Co.", "WinCo Foods", "Save-A-Lot", "Ascena Retail Group", "Dine Brands Global", "Office Depot", "GameStop", "Dillard's", "Burlington Coat Factory", "ToysRUs", "Ulta Salon, Cosmetics & Fragrance", "Sephora (LVMH)", "Foot Locker", "Ikea North American Svcs.", "Domino's Pizza", "Academy", "Panera Bread Company", "AVB Brandsource", "Signet Jewelers", "Big Lots", "Williams-Sonoma", "Saks Fifth Avenue / Lord & Taylor", "Defense Commissary Agency", "Hobby Lobby Stores", "Speedway", "Michaels Stores", "True Value Co.", "Discount Tire", "Sprouts Farmers Market", "Exxon Mobil Corporation", "Neiman Marcus", "Jack in the Box", "Shell Oil Company", "Sonic", "Chipotle Mexican Grill", "SUPERVALU", "Belk", "Petco Animal Supplies"];


    var y = ["495.76", "115.89", "155.94", "123.84", "100.59", "97.12", "79.54", "71.88", "68.41", "59.72", "72.29", "44.94", "42.15", "90.91", "34.56", "35.87", "98.53", "24.84", "23.47", "23.06", "22.24", "21.52", "18.90", "18.89", "55.43", "17.15", "17.53", "22.39", "16.30", "15.41", "14.90", "85.91", "14.01", "28.89", "13.39", "15.69", "12.45", "12.50", "12.44", "13.77", "11.88", "10.95", "10.63", "10.28", "9.79", "9.64", "10.92", "13.03", "10.28", "9.10", "10.17", "9.04", "9.02", "8.68", "20.08", "8.60", "8.50", "8.64", "8.55", "9.79", "7.39", "7.84", "7.26", "7.12", "7.01", "6.76", "7.37", "9.53", "8.63", "6.12", "6.04", "11.31", "5.88", "10.96", "7.84", "44.92", "12.66", "5.77", "5.63", "5.49", "6.11", "5.27", "5.25", "11.86", "5.08", "4.91", "4.90", "5.36", "4.84", "4.72", "4.67", "10.49", "4.77", "4.46", "5.04", "4.41", "4.48", "4.40", "4.29", "4.18"];
    var p = ['y', 'n'];
    let username = 'jcmainiero@gmail.com';
    for (let i = 0; i < y.length; i++) {
        let transId = Math.ceil(10000 + Math.random() * 9000000000000000);
        let transAmnt = y[Math.ceil(Math.random() * y.length - 1)];
        let vendor = x[Math.ceil(Math.random() * x.length - 1)];
        let posted = p[Math.ceil(Math.random() * p.length - 1)];

        db.query(`INSERT INTO ck_trans(accountId, ck_id, trans_id, vendor, transAmnt, posted) VALUES((SELECT accountId from accounts WHERE email = '${username}'), (SELECT ck_id from accounts WHERE email = '${username}'), ${transId}, ?, ?, ?)`, [vendor, transAmnt, posted], function (err, result) {
            if (err) throw err;
            console.log('Running');
            console.log(result == '');
            res.end(JSON.stringify(result));
        });
    }
});


app.get('/updateBalance', (req, res) => {
    //Avail = Starting - Pending;
    //Starting = Without adjustments
    //Pending - Anything with 'n' as posted

    //3 Queries to do the job
    /*
    UPDATE ck_bal SET availBal = (SELECT todaysBal - (SELECT SUM(transAmnt) from ck_trans WHERE posted ='n') FROM ck_bal WHERE accountId = 1) WHERE accountId=1;
    UPDATE ck_bal SET pendingBal = (SELECT SUM(transAmnt) from ck_trans WHERE posted ='n' AND accountId = 1) WHERE accountId=1;

    */

    db.query(`UPDATE ck_bal SET availBal = (SELECT todaysBal - (SELECT SUM(transAmnt) from ck_trans WHERE posted ='n') FROM ck_bal WHERE accountId = ?) WHERE accountId=?`, [1, 1], (err, result) => {
        if (err) throw err;
        console.log('Running');
        console.log(result == '');
        res.end(JSON.stringify(result));
    });
    db.query(`UPDATE ck_bal SET pendingBal = (SELECT SUM(transAmnt) from ck_trans WHERE posted ='n' AND accountId = ?) WHERE accountId=?`, [1, 1], (err, result) => {
        if (err) throw err;
        console.log('Running');
        console.log(result == '');
        res.end(JSON.stringify(result));
    });

});


app.listen('3000', () => {
    console.log('Listening on 3000');
}); 
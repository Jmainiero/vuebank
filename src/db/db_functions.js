var db = require('./db_con');
const bcrypt = require('bcrypt');

const postSignup = async (password, req) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const ck_id = Math.ceil(1000 + Math.random() * 9000000000000000);
    const sv_id = Math.ceil(1000 + Math.random() * 90000000000);
    const query = new Promise((resolve, reject) => {
      db.query(`INSERT INTO accounts(firstName, lastName,email,password,phoneNumber,address,city,state,zip, ck_id, sv_id) VALUES('${req.body.formdata.first}','${req.body.formdata.last}','${req.body.formdata.email}','${hashedPassword}',${req.body.formdata.phone},'${req.body.formdata.address}','${req.body.formdata.city}','${req.body.formdata.state}',${req.body.formdata.zip}, ${ck_id}, ${sv_id})`, function async(err, result) {
        if (err) {
          if (err.code == 'ER_DUP_ENTRY') reject();
          if (err && err.code != 'ER_DUP_ENTRY') throw err;
        }
        // console.log(result);
        console.log(result.insertId);
        resolve(JSON.stringify({ 'msg': 'Account Created', 'code': 200 }));
      });
    });
    ckGenerateTrans();
    return await query;
  } catch {
    return JSON.stringify({ 'msg': 'Account with that email address already exists.', 'code': 409 });
  }
};

const checking = (username) => {
  try {

    // console.log(req.body.formdata);
    console.log(username);
    db.query(`SELECT * from accounts WHERE email = ?`, username, function (err, result) {
      if (err) throw err;

      return JSON.stringify(result);
    });

  } catch {
    return 500;
  }
};

const ckAccountInfo = async (username) => {
  try {
    const query = new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ck_bal WHERE accountId = (SELECT accountId from accounts WHERE email = ?)`, username, function async(err, result) {
        if (err) throw err;

        if (result == '') {
          console.log('Empty Data');
          return { 'status': 204, 'msg': 'No Data found' };
        }
        resolve(JSON.stringify(result));
      });
    });
    return await query;
  } catch {
    return { 'code': 500 };
  }
};
const svAccountInfo = async (username) => {
  try {
    const query = new Promise((resolve, reject) => {
      db.query(`SELECT * FROM sv_bal WHERE accountId = (SELECT accountId from accounts WHERE email = ?)`, username, function async(err, result) {
        if (err) throw err;

        if (result == '') {
          console.log('Empty Data');
          return { 'status': 204, 'msg': 'No Data found' };
        }
        resolve(JSON.stringify(result));
      });
    });
    return await query;
  } catch {
    return { 'code': 500 };
  }
};

//used to populate transaction table with misc data.
const ckGenerateTrans = async () => {
  //Generate random list of transactions and post them into the database.
  var x = ["Walmart", "The Kroger Co.", "Amazon", "Costco", "The Home Depot", "Walgreens Boots Alliance", "CVS Health Corporation", "Target", "Lowe's Companies", "Albertsons Companies", "Royal Ahold Delhaize USA", "Apple Stores / iTunes", "Best Buy", "McDonald's", "Publix Super Markets", "TJX Companies", "Aldi", "Macy's", "Dollar General", "H-E-B Grocery", "Dollar Tree", "Rite Aid", "Kohl's", "Verizon Wireless", "YUM! Brands", "Meijer", "Ace Hardware", "Starbucks", "Wakefern / ShopRite", "Nordstrom", "Sears Holdings", "7-Eleven", "Ross Stores", "Subway", "AT&T Wireless", "Gap", "BJ's Wholesale Club", "J.C. Penney Co.", "Bed Bath & Beyond", "Qurate Retail Group (formerly QVC)", "L Brands", "Menard", "Southeastern Grocers", "Health Mart Systems", "Good Neighbor Pharmacy", "Hy-Vee", "AutoZone", "Alimentation Couche-Tard", "Wendy's", "Chick-fil-A", "Dunkin' Brands Group", "Giant Eagle", "O'Reilly Auto Parts", "Wegmans Food Market", "Burger King Worldwide", "Dick's Sporting Goods", "Darden Restaurants", "PetSmart", "Sherwin-Williams", "Staples", "Army & Air Force Exchange", "Bass Pro", "Tractor Supply Co.", "WinCo Foods", "Save-A-Lot", "Ascena Retail Group", "Dine Brands Global", "Office Depot", "GameStop", "Dillard's", "Burlington Coat Factory", "ToysRUs", "Ulta Salon, Cosmetics & Fragrance", "Sephora (LVMH)", "Foot Locker", "Ikea North American Svcs.", "Domino's Pizza", "Academy", "Panera Bread Company", "AVB Brandsource", "Signet Jewelers", "Big Lots", "Williams-Sonoma", "Saks Fifth Avenue / Lord & Taylor", "Defense Commissary Agency", "Hobby Lobby Stores", "Speedway", "Michaels Stores", "True Value Co.", "Discount Tire", "Sprouts Farmers Market", "Exxon Mobil Corporation", "Neiman Marcus", "Jack in the Box", "Shell Oil Company", "Sonic", "Chipotle Mexican Grill", "SUPERVALU", "Belk", "Petco Animal Supplies"];


  var y = ["495.76", "115.89", "155.94", "123.84", "100.59", "97.12", "79.54", "71.88", "68.41", "59.72", "72.29", "44.94", "42.15", "90.91", "34.56", "35.87", "98.53", "24.84", "23.47", "23.06", "22.24", "21.52", "18.90", "18.89", "55.43", "17.15", "17.53", "22.39", "16.30", "15.41", "14.90", "85.91", "14.01", "28.89", "13.39", "15.69", "12.45", "12.50", "12.44", "13.77", "11.88", "10.95", "10.63", "10.28", "9.79", "9.64", "10.92", "13.03", "10.28", "9.10", "10.17", "9.04", "9.02", "8.68", "20.08", "8.60", "8.50", "8.64", "8.55", "9.79", "7.39", "7.84", "7.26", "7.12", "7.01", "6.76", "7.37", "9.53", "8.63", "6.12", "6.04", "11.31", "5.88", "10.96", "7.84", "44.92", "12.66", "5.77", "5.63", "5.49", "6.11", "5.27", "5.25", "11.86", "5.08", "4.91", "4.90", "5.36", "4.84", "4.72", "4.67", "10.49", "4.77", "4.46", "5.04", "4.41", "4.48", "4.40", "4.29", "4.18"];
  var p = ['y', 'n'];
  var c = ['y', 'n'];
  let username = 'jcmainiero@gmail.com';

  let i = 0;
  for (let nr in y) {
    if (i != y.length - 1) {
      let transId = Math.ceil(10000 + Math.random() * 9000000000000000);
      let transAmnt = y[Math.ceil(Math.random() * y.length - 1)];
      let vendor = x[Math.ceil(Math.random() * x.length - 1)];
      let posted = p[Math.ceil(Math.random() * p.length - 1)];
      let credit = c[Math.ceil(Math.random() * p.length - 1)];
      const q = await db.query(`INSERT INTO ck_trans(accountId, ck_id, trans_id, vendor, transAmnt, posted, credit) VALUES((SELECT accountId from accounts WHERE email = '${username}'), (SELECT ck_id from accounts WHERE email = '${username}'), ${transId}, ?, ?, ?, ?)`, [vendor, transAmnt, posted, credit]);
    } else {
      updateBalance();
      return { 'code': 200, "msg": 'COMPLETED TRANSACTION GENERATION' };

    }
    i++;
  }
};

const svGenerateTrans = async () => {
  //Generate random list of transactions and post them into the database.
  var x = [{ 'Job A': '1073' }, { 'Job A': '548' }, { '#Transfer from CK#': '750' }, { "Interest Paid": '3.00' }];

  var p = ['y', 'n'];
  var c = ['y', 'n'];
  let username = 'jcmainiero@gmail.com';

  for (let i = 0; i < 10; i++) {
    x.forEach(async (t) => {
      for (let y in t) {
        let transId = Math.ceil(10000 + Math.random() * 9000000000000000);
        let vendor = y;
        let transAmnt = t[y];
        let posted = p[Math.ceil(Math.random() * p.length - 1)];
        let credit = c[Math.ceil(Math.random() * p.length - 1)];

        const q = await db.query(`INSERT INTO sv_trans(accountId, sv_id, trans_id, vendor, transAmnt, posted, credit) VALUES((SELECT accountId from accounts WHERE email = '${username}'), (SELECT ck_id from accounts WHERE email = '${username}'), ${transId}, ?, ?, ?, ?)`, [vendor, transAmnt, posted, credit]);
      }
    });
    if (i == 9) {
      return { 'code': 200, "msg": 'COMPLETED TRANSACTION GENERATION' };
    }
  }
};

const updateBalance = async () => {
  //Avail = Starting - Pending;
  //Starting = Without adjustments
  //Pending - Anything with 'n' as posted

  //Available Balance Checking
  await db.query(`UPDATE ck_bal SET availBal = (SELECT todaysBal - (SELECT IF(SUM(transAMnt) IS NOT null, SUM(transAmnt), 0) from ck_trans WHERE posted = 'n') FROM ck_bal WHERE accountId = ?) WHERE accountId=?`, [1, 1], (err, result) => {
    if (err) throw err;

    console.log('Checking: Available Balance Completed.')
  });
  //Pending Balance Checking
  await db.query(`UPDATE ck_bal SET pendingBal = (SELECT SUM(transAmnt) from ck_trans WHERE posted ='n' AND accountId = ?) WHERE accountId=?`, [1, 1], (err, result) => {
    if (err) throw err;

    console.log('Checking: Pending Balance Completed.');
  });
  /*
  Available Balance Savings
  Available balance is your Starting Balance - your overall charges
      Overall charges are calculated as such
          Credits - Charges = Amnt
 
      Available balance is calculatd based off the above
          Starting Ballance - Amnt = Available balance
  */

  //Check if there are no-credit transactions
  await await db.query(`SELECT count(transAmnt) from sv_trans  WHERE credit ='n' AND accountId = ?`, 1, async (err, result) => {
    if (err) throw err;
    // console.log(result[0]['count(transAmnt)']);
    if (result[0]['count(transAmnt)'] == 0) {
      //(SELECT todaysBal - (SELECT (SELECT SUM(transAmnt) from sv_trans WHERE credit ='y')) FROM sv_bal WHERE accountId = 1);
      await db.query(`UPDATE sv_bal SET availBal = (SELECT todaysBal - (SELECT IF(SUM(transAMnt) IS NOT null, SUM(transAmnt), 0) from sv_trans WHERE posted = 'n') FROM sv_bal WHERE accountId = ?) WHERE accountId=?`, [1, 1], (err, result) => {
        if (err) throw err;
        console.log('Savings: Available Balance Completed.')
      });
    } else {
      await db.query(`UPDATE sv_bal SET availBal = (SELECT todaysBal - (SELECT (SELECT SUM(transAmnt) from sv_trans WHERE credit ='y') - (SELECT SUM(transAmnt) from sv_trans WHERE credit ='n') AS difference) FROM sv_bal WHERE accountId = ?) WHERE accountId=?`, [1, 1], (err, result) => {
        if (err) throw err;
        console.log('Savings: Available Balance Completed.')
      });
    }
  });

  //Pending Balance Savings
  /*
  Pending balance is your available balance - pending charges 
 
  i.e availalbe balance minus charges where credit = 'n';
  */
  //SELECT (SELECT SUM(transAmnt) from sv_trans WHERE credit ='y' AND posted ='n') - (SELECT SUM(transAmnt) from sv_trans WHERE credit ='n' AND posted ='n') AS difference;

  await await db.query(`SELECT count(transAmnt) from sv_trans  WHERE credit ='n' AND posted ='n' AND accountId = ?`, 1, async (err, result) => {
    if (err) throw err;
    // console.log(result[0]['count(transAmnt)']);
    if (result[0]['count(transAmnt)'] == 0) {
      await db.query(`UPDATE sv_bal SET pendingBal = 0 WHERE accountId=?`, [1, 1], (err, result) => {
        if (err) throw err;
        console.log('Savings: Available Balance Completed.')
      });
      console.log('Ran 178');
    } else {
      await db.query(`UPDATE sv_bal SET pendingBal =  (SELECT (SELECT SUM(transAmnt) from sv_trans WHERE credit ='y') - (SELECT SUM(transAmnt) from sv_trans WHERE credit ='n') AS difference) WHERE accountId=?`, [1, 1], (err, result) => {
        if (err) throw err;
        console.log('Savings: Available Balance Completed.')
      });
    }
  });
  return { 'code': 200, "msg": 'COMPLETED BALANCE UPDATING....' };
};

const transfer = async (toAcc, toAmnt, username, req) => {
  let toTable = '', fromTable = '', todbId = '', fromdbId = '';
  let transId = Math.ceil(10000 + Math.random() * 9000000000000000);
  let posted = 'n';
  if (req.transferdata.toAcc == 'checking') {
    toTable = 'ck_trans';
    todbId = 'ck_id';
    fromTable = 'sv_trans';
    fromdbId = 'sv_id';
  } else {
    toTable = 'sv_trans';
    todbId = 'sv_id';
    fromTable = 'ck_trans';
    fromdbId = 'ck_id';
  }
  const q = await db.query(`INSERT INTO ${toTable}(accountId, ${todbId}, trans_id, vendor, transAmnt, posted, credit) VALUES((SELECT accountId from accounts WHERE email = '${username}'), (SELECT ck_id from accounts WHERE email = '${username}'), ${transId}, ?, ?, ?, 'y')`, [`Transfer from ${req.transferdata.fromAcc}`, toAmnt, posted]);

  await updateBalance();
  return { 'code': 200, "msg": 'COMPLETED BALANCE TRASNFER....', 'query': q };
};

const getTransactions = async (username) => {
  try {
    const query = new Promise((resolve, reject) => {
      db.query(`SELECT *, DATE(created_date) as 'Date' FROM ck_trans WHERE accountId = (SELECT accountId from accounts WHERE email = ?) LIMIT 10`, username, function async(err, result) {
        if (err) throw err;

        if (result == '') {
          console.log('Empty Data');
          return { 'status': 204, 'msg': 'No Data found' };
        }
        resolve(JSON.stringify(result));
      });
    });
    return await query;
  } catch {
    return { 'code': 500 };
  }
};

module.exports = { postSignup, checking, ckAccountInfo, svAccountInfo, ckGenerateTrans, updateBalance, svGenerateTrans, transfer, getTransactions };
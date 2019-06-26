var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin') // Trabajar con la base de datos
var serviceAccount = require('../firebase-config.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://ureport-93a7b.firebaseio.com"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var reportsList;
  const reports = firebase.database().ref('/reports')
  reports.on('value', (snapshot) => {
    reportsList = snapshot.val();
    res.render('index', { reports: reportsList });
  })
});

module.exports = router;

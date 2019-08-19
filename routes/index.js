var express = require('express');
var router = express.Router();
var scrape = require('../utils/scrape');
const Restuarant = require('../models/restaurant');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/start', async function (req, res, next) {
  var info = await scrape.run();
  console.log(info);
  for(var i=0; i<info.length; i++) {
    var restaurant = new Restuarant();
    restaurant.name = info[i].name;
    restaurant.phone = info[i].phone;
    restaurant.reviews = info[i].reviews;
    restaurant.address = info[i].address?info[i].address:'';
    restaurant.description = info[i].description?info[i].description:'';
    restaurant.group = info[i].priceCategory?info[i].priceCategory:'';
    restaurant.space = info[i].area?info[i].area:'';
    restaurant.save();
  }
  res.render('finish', {
    info: JSON.stringify(info)
  });
});

module.exports = router;

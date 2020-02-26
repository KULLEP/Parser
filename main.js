var request = require('request');
var iconv  = require('iconv-lite');

var opt = {
    url: 'http://www.ferra.ru/ru/techlife/news/',
    encoding: null
}

request(opt, function (err, res, body) {
    if (err) throw err;
    console.log(iconv.decode(body, 'win1251'));
    console.log(res.statusCode);
});
 var needle = require('needle');
 var url = 'https://aliexpress.ru/home.htm';


 needle.get(url, () => {
 if (err) throw(err);

 console.log("Залупная залупа");
 });
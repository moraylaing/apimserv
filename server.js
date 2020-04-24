// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'}); 
});

//get the IP language  browser os and platform
app.get('/api/whoami', function(req, res)
{
  var outPutJson = {};
  var ipAddress = req.ip;

  // var testIPstring = '::ffff:10.69.208.153';
  var trimedIpAddress = ipAddress.replace(/[A-Za-z]|:/g, '');

  var language = req.headers['accept-language'];
  var trimedLanguage = language.slice(0, language.indexOf(','));
  var softwareInfo = req.headers['user-agent'];
  var startIndex = softwareInfo.indexOf('\(');
  var endIndex = softwareInfo.indexOf('\)');
  var trimedSoftwareInfo = softwareInfo.slice(startIndex + 1, endIndex);

   console.log(ipAddress);
   console.log(language); 
   console.log(softwareInfo);

  outPutJson = {
      ipaddress: ipAddress,
      language: language,
      software: softwareInfo,
    };

  res.json(outPutJson);
});
app.get('/api/lostcirc', function(req, res)
{
  var outPutJson = {};
  let randomNum = 3000000000+ Math.random()*1000000;
  console.log(randomNum);
  let newDate =  new Date(new Date().getUTCMilliseconds()+randomNum);
  let timeToEvent=newDate.getHours()+":"+newDate.getMinutes();

   console.log(timeToEvent); 

  outPutJson = {
      LostCircEventAt: timeToEvent
      
    }; 

  res.json(outPutJson);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

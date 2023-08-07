// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

// timestamp microservice

app.get("/api", (req, res) => {
  
  let unixDate = Date.now();
  let dateObject = new Date();
  let gmtFormattedDate = dateObject.toGMTString();

  res.json({"unix": unixDate,"utc": gmtFormattedDate});
  
});

app.get("/api/:date", (req, res) => {

  let date = req.params.date;
  const unixEpoch = /^(\d*)$/;
  
  if (unixEpoch.test(date)) {
    
    let unixDate = +date;
    let dateObject = new Date(unixDate);
    let gmtFormattedDate = dateObject.toGMTString();
  
    res.json({"unix": unixDate,"utc": gmtFormattedDate});
        
  } else {
      
    let dateObject = new Date(date);
    let unixDate = dateObject.getTime();
    unixDate = +unixDate;
    let gmtFormattedDate = dateObject.toGMTString();

    if (gmtFormattedDate == "Invalid Date") {
        
      res.json({ error : "Invalid Date" });
        
    } else {
        
      res.json({"unix": unixDate,"utc": gmtFormattedDate});
        
    }
      
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

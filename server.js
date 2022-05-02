// server.js
// where your node app starts
require('dotenv').config()
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


app.get("/api", function (req, res) {
  let date = new Date()
  let unix = date.getTime()
  let utc = date.toUTCString()

  if (!unix) return res.json({ error: "Invalid Date" })
  res.json({ unix, utc });
});



app.get("/api/:date", (req, res) => {

  let regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g

  let parseDate = isNaN(req.params.date) ? req.params.date : parseInt(req.params.date)
  let date = new Date(parseDate)

  let unix = date.getTime()
  let utc = date.toUTCString()

  if (!unix) return res.json({ error: "Invalid Date" })
  res.json({ unix, utc });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

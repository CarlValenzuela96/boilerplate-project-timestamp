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


function tiene_letras(texto) {
  texto = texto.toLowerCase();
  let letras = Array.from(texto)
  
  for (i = 0; i < texto.length; i++) {
    if (letras.indexOf(texto.charAt(i), 0) != -1) {
      return 1;
    }
  }
  return 0;
}

app.get("/api/:date", (req, res) => {

  let parseDate = tiene_letras(req.params.date) ? req.params.date : parseInt(req.params.date)
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

const express = require('express');
const app = express();
require('dotenv').config();
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.serverPORT;
const apiKeyOWM = process.env.owmApiKey;

app.use(express.static('../client'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.get('/nearby', (request, response) => {
  const longitude = request.query.lon;
  const latitude = request.query.lat;
  if (!latitude || !longitude) {
    response
      .set({ 'content-type': 'application/json' })
      .status(401)
      .json({ error: 'You need to provide longitude and latitude by allowing geo-location!' })
  }
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKeyOWM}`)
    .then(res => res.json())
    .then(data => {
      fetch(`https://source.unsplash.com/360x300/?${data.name}`)
        .then(res => {
          data.imageURL = res.url
          return response
            .status(200)
            .json(data)
        })
    });
})

app.get('/search/:city', (request, response) => {
  const city = request.params.city;
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKeyOWM}`)
    .then(res => res.json())
    .then(data => {
      fetch(`https://source.unsplash.com/360x300/?${city}`)
        .then(res => {
          data.imageURL = res.url
          response
            .status(200)
            .json(data)
        });
    })
})

app.get('/forecast/:city', (request, response) => {
  const city = request.params.city;
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKeyOWM}`)
    .then(res => res.json())
    .then(data => response.set({ 'content-type': 'application/json' }).status(200).json(data))
})


app.listen(port, () => console.log(`Server listening on port ${port}`));

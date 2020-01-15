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
          console.log('data pås erversidan ', data)
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

// app.get('/search/:city', (request, response) => {
//   try {
//     const city = request.params.city;
//     const fetchOwm =
//       fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKeyOWM}`).then(res => res.json());
//     const fetchUnsplash = fetch(`https://source.unsplash.com/360x300/?${city}`).then(res => res.url);
//     const newData = { 'data': {} };
//     Promise.all([fetchOwm, fetchUnsplash])
//       .then(values => {
//         newData['data'] = values[0]
//         newData.data['imageURL'] = values[1]
//         response
//           .status(200)
//           .json(newData)
//       })
//   } catch (error) {
//     response.status(500).json({ message: error.message });
//   }
// })



app.listen(port, () => console.log(`Server listening on port ${port}`));

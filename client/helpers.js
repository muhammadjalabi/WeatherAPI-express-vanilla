
const weatherInfo = document.querySelector('.container__display__result__temp-desc');
const tempHiLo = document.querySelector('.container__display__result__temp-highestlowest');
const tempDegree = document.querySelector('.container__display__result__temp-degree');
const tempLocation = document.querySelector('.container__display__result__location-country');
const weatherIcon = document.querySelector('.container__display__result__weather-icon');
const cityImage = document.querySelector('.container__display__result__city-image-holder');

/* FORECAST DOM!!!! */
const containerDiv = document.querySelector('.container__display')
const divFC = document.createElement('div')
const fcHead = document.createElement('h2')
const divFCResult = document.createElement('div')
const fcDay1 = document.createElement('p');
const fcDay2 = document.createElement('p');
const fcDay3 = document.createElement('p');

divFC.className = 'container__display__forecast';
fcHead.className = 'container__display__forecast__heading';
divFCResult.className = 'container__display__forecast__result';
fcDay1.className = 'container__display__forecast__result__day-1';
fcDay2.className = 'container__display__forecast__result__day-2';
fcDay3.className = 'container__display__forecast__result__day-3';
const appendForecast = () => {
  divFC.appendChild(fcHead);
  divFC.appendChild(divFCResult)
  divFCResult.appendChild(fcDay1)
  divFCResult.appendChild(fcDay2)
  divFCResult.appendChild(fcDay3);
  containerDiv.appendChild(divFC)
}
/* end of forecast dom manipulation*/


const printResult = (data) => {
  const { name } = data;
  const { country } = data.sys;
  const { humidity, temp, temp_max, temp_min } = data.main;
  const { description, icon, id, main } = data.weather[0];
  const { all } = data.clouds;
  const { deg, speed } = data.wind;
  getForecast(name)

  cityImage.src = data.imageURL
  tempLocation.innerHTML = `${name} (${country}), right now:`
  tempDegree.innerHTML = `Temperature is ${temp}°C`;
  tempHiLo.innerHTML = `Highest / Lowest temps: ${temp_max}° / ${temp_min}° `;
  weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherInfo.innerHTML = `
  <p> mainly ${description} today</p>
  <p> Cloud: ${all}%</p>
  <p> Humidity: ${humidity}%</p>
  <p> Wind speed is ${speed} m/s <br />
    (Wind direction is ${deg}°)
  </p>`;
}


const beautifyPage = (result) => {
  switch (result.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = `url('/img/clear-sky.jpg') no-repeat center center fixed`;
      break;
    case 'Clouds':
      document.body.style.backgroundImage = `url('/img/cloudy.jpg') no-repeat center center fixed`;
      break;
    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = `url('/img/rain.jpg') no-repeat center center fixed`;
      break;
    case 'Thunderstorm':
      document.body.style.backgroundImage = `url('/img/storm.jpg') no-repeat center center fixed`;
      break;
    case 'Snow':
      document.body.style.backgroundImage = `url('/img/snow.jpg') no-repeat center center fixed`;
      break;
    default:
      document.body.style.backgroundImage = `url('/img/default.jpg') no-repeat center center fixed`;
      break;
  }
}


const getForecast = (query) => {
  const apiForecast = `/forecast/${query}`;
  fetch(apiForecast)
    .then(res => res.json())
    .then(data => {
      appendForecast()
      printForecast(data)
    })
}

const getFcData = (data) => {

  const twelve = data.list.filter(item => item.dt_txt.split(' ')[1] === '12:00:00')
  const fifteen = data.list.filter(item => item.dt_txt.split(' ')[1] === '15:00:00')
  const eighteen = data.list.filter(item => item.dt_txt.split(' ')[1] === '18:00:00')
  let threeDayFc = [
    {
      'day1': [twelve[0], fifteen[1], eighteen[1]],
      'day2': [twelve[1], fifteen[2], eighteen[2]],
      'day3': [twelve[2], fifteen[3], eighteen[3]]
    }
  ]
  return threeDayFc
}

const printForecast = (data) => {
  let test = getFcData(data);
  fcHead.innerHTML = `3 day forecast in ${data.city.name}!`;
  fcDay1.innerHTML = test[0].day1.map(item =>
    `<p> ${item.dt_txt.split(' ')[0]}  <br />
    Time: ${item.dt_txt.split(' ')[1]} </p>
    ${item.main.temp}°C with ${item.weather[0].description}!<br />`)

  fcDay2.innerHTML = test[0].day2.map(item =>
    `<p> ${item.dt_txt.split(' ')[0]}  <br />
    Time: ${item.dt_txt.split(' ')[1]} </p>
    ${item.main.temp}°C with ${item.weather[0].description}!<br /> `)

  fcDay3.innerHTML = test[0].day3.map(item =>
    `<p> ${item.dt_txt.split(' ')[0]}  <br />
    Time: ${item.dt_txt.split(' ')[1]} </p>
    ${item.main.temp}°C with ${item.weather[0].description}!<br />`)
}

export {
  printResult,
  beautifyPage,
};
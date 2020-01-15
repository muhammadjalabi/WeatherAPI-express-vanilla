
const weatherInfo = document.querySelector('.container__display__result__temp-desc');
const tempHiLo = document.querySelector('.container__display__result__temp-highestlowest');
const tempDegree = document.querySelector('.container__display__result__temp-degree');
const tempLocation = document.querySelector('.container__display__result__location-country');
const weatherIcon = document.querySelector('.container__display__result__weather-icon');
const cityImage = document.querySelector('.container__display__result__city-image-holder');


const printResult = (data) => {
  console.log('this is data', data)
  const { name } = data;
  const { country } = data.sys;
  const { humidity, temp, temp_max, temp_min } = data.main;
  const { description, icon, id, main } = data.weather[0];
  const { all } = data.clouds;
  const { deg, speed } = data.wind;
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
      document.body.style.backgroundImage = `url('/img/clear-sky.jpg')`;
      break;
    case 'Clouds':
      document.body.style.backgroundImage = `url('/img/cloudy.jpg')`;
      break;
    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = `url('/img/rain.jpg')`;
      break;
    case 'Thunderstorm':
      document.body.style.backgroundImage = `url('/img/storm.jpg')`;
      break;
    case 'Snow':
      document.body.style.backgroundImage = `url('/img/snow.jpg')`;
      break;
    default:
      document.body.style.backgroundImage = `url('/img/default.jpg')`;
      break;
  }
}

const getFCByGeo = (latitude, longitude) => {
  console.log('getFCbygeo helpers')
  const urlGeoFC = `/nearby?lat=${latitude}&lon=${longitude}`;


}

const getForecast = (data) => {
  // fcDay1.innerHTML =
  //   `Time: ${data.list[0].dt_txt.split(' ')[1]} -->  Degrees: ${data.list[0].main.temp}° <br />(${data.list[0].weather[0].description})  <br />`;
  const divFC = document.createElement('div')
  const fcHead = document.createElement('h2')
  const divFCResult = document.createElement('div')
  const fcDay1 = document.createElement('p');
  const fcDay2 = document.createElement('p');
  const fcDay3 = document.createElement('p');


  divFC.className = 'container__display__forecast';
  fcHead.className = 'container__display__forecast__heading'
  divFCResult.className = 'container__display__forecast__result';
  fcDay1.className = 'container__display__forecast__result__day-1'
  fcDay2.className = 'container__display__forecast__result__day-2'
  fcDay3.className = 'container__display__forecast__result__day-3'



}



export {
  printResult,
  beautifyPage,
  getFCByGeo,
  getForecast
};
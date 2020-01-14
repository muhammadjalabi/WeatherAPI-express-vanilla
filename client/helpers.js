const weatherInfo = document.querySelector('.container__display__result__temp-desc');
const tempHiLo = document.querySelector('.container__display__result__temp-highestlowest');
const tempDegree = document.querySelector('.container__display__result__temp-degree');
const tempLocation = document.querySelector('.container__display__result__location-country');
const weatherIcon = document.querySelector('.container__display__result__weather-icon')

const printResult = (data) => {
  const { name } = data;
  const { country } = data.sys;
  const { humidity, temp, temp_max, temp_min } = data.main;
  const { description, icon, id, main } = data.weather[0];
  const { all } = data.clouds;
  const { deg, speed } = data.wind;
  console.log('whats data', data)
  tempLocation.innerHTML = `${name} (${country}), right now:`
  tempDegree.innerHTML = `Temperature is ${temp}° (celsius)`;
  tempHiLo.innerHTML = `Highest / Lowest temps: ${temp_max}° / ${temp_min}° `;
  weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherInfo.innerHTML = `
  <p> Mainly ${description}</p>
  <p> Cloud: ${all}%</p>
  <p> Humidity: ${humidity}%</p>
  <p> Wind speed is ${speed}m/s <br />
    (Wind direction is ${deg}°)
  </p>`;
}

const beautifyPage = (result) => {
  console.log('this is result', result)
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



export {
  printResult,
  beautifyPage
};
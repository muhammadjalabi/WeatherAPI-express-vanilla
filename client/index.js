import { printResult, beautifyPage } from './helpers.js'
const searchButton = document.querySelector('.container__display__search-button');

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiNearby = `/nearby?lat=${latitude}&lon=${longitude}`;
      fetch(apiNearby)
        .then(response => response.json())
        .then(data => {
          beautifyPage(data)
          printResult(data)
        })
    })
  }
})

const getWeather = (query) => {
  const apiSearchCity = `/search/${query}`;
  fetch(apiSearchCity)
    .then(response => response.json())
    .then(data => {
      beautifyPage(data)
      printResult(data)
    })
}

searchButton.addEventListener('click', () => {
  const searchInput = document.querySelector('.container__display__search-input').value;
  if (searchInput) {
    getWeather(searchInput)
  }
})
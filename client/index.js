import { printResult, beautifyPage, /*getFCByGeo, */ getForecast } from './helpers.js'

window.addEventListener('load', () => {
  const searchButton = document.querySelector('.container__display__search-button');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiNearby = `/nearby?lat=${latitude}&lon=${longitude}`;
      fetch(apiNearby)
        .then(response => response.json())
        .then(data => {
          // getFCByGeo(latitude, longitude)
          beautifyPage(data)
          printResult(data)
        })
    })
  }

  const getWeather = (query) => {
    const apiSearchCity = `/search/${query}`;
    fetch(apiSearchCity)
      .then(response => response.json())
      .then(data => {
        beautifyPage(data)
        printResult(data)
      })

  }
  getForecast();

  searchButton.addEventListener('click', () => {
    const searchInput = document.querySelector('.container__display__search-input').value;
    if (searchInput) {
      console.log('searchinpuuut', searchInput)
      getWeather(searchInput)
    }
  })
})
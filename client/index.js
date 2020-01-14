
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
          console.log(data)
        })
    })
  }

  const getWeather = (query) => {
    const apiSearchCity = `/search/${query}`;
    fetch(apiSearchCity)
      .then(response => response.json())
      .then(data => console.log(data))
  }

  searchButton.addEventListener('click', () => {
    const query = document.querySelector('.container__display__search-input');
    if (query) {
      console.log(query)
      // if there is something input in input field on press, search the weather and get the image
    }
  })
})
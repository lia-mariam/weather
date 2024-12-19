const apiKey = 'f351e56535eca8d981f0a435989713c1'; // Replace with your OpenWeatherMap API key
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherInfo.textContent = 'Please enter a city name.';
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      const { name, main, weather } = data;
      const weatherDescription = weather[0].description;

      weatherInfo.innerHTML = `
        <div class="weather-card">
          <h2>${name}</h2>
          <p><strong>Temperature:</strong> ${main.temp}°C</p>
          <p><strong>Humidity:</strong> ${main.humidity}%</p>
          <p><strong>Condition:</strong> ${weatherDescription}</p>
        </div>
      `;

      // Change background based on weather condition
      changeBackground(weatherDescription);
    })
    .catch(error => {
      weatherInfo.textContent = error.message;
    });
});

function changeBackground(weatherDescription) {
  const body = document.body;

  // Set a default background and text color
  body.style.backgroundImage = '';
  body.style.color = 'white';

  // Update the background based on weather condition
  if (weatherDescription.includes('clear')) {
    body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?sunny")';
  } else if (weatherDescription.includes('cloud')) {
    body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?cloudy")';
  } else if (weatherDescription.includes('rain')) {
    body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?rain")';
  } else {
    body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?weather")';
  }

  body.style.backgroundSize = 'cover';
  body.style.backgroundPosition = 'center';
}

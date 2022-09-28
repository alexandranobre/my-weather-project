function formatDate(date) {
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let formattedDate = document.querySelector("h2");
  formattedDate.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                   <img src="http://openweathermap.org/img/wn/${
                     forecastDay.weather[0].icon
                   }@2x.png" alt="" width="42"/>
          <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}º</span>
<span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}º</span>
</div>
        </div>
        </div> `;
    }
  });

  forecastHTML + forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "33bf045b116ab19ff62ee0c20a979fdb";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp) + `ºC`;
  document.querySelector("#wind").innerHTML =
    `wind: ` + response.data.wind.speed + `km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let apiKey = "33bf045b116ab19ff62ee0c20a979fdb";
  let city = document.querySelector("#newcity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "33bf045b116ab19ff62ee0c20a979fdb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentTime = new Date();
console.log(currentTime);
console.log(currentTime.getMinutes());
console.log(currentTime.getHours());
console.log(currentTime.getDay());
console.log(formatDate(currentTime));

let searchForm = document.querySelector("#entercity");
searchForm.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

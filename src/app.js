
function showCurrentDate(timestamp) {
    let now = new Date(timestamp);

    let date = now.getDate();
    let dateUnderTen = `0${date}`;
        if (date < 10) {
        date = dateUnderTen;
        } else {
        date = now.getDate();
        }
    let months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
        ];
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    return `${date}/${month}/${year}  ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
    let now = new Date(timestamp);
    let hours = now.getHours();
     if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function showCurrentWeather (response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${currentTemperature}`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  let dateElement = document.querySelector("#current-date-time");
  dateElement.innerHTML = showCurrentDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  console.log(`${currentTemperature}`);
}

function displayForecast(response) {
    
    let forecastElement = document.querySelector("#forecast");
    let forecast = null;
    forecastElement.innerHTML = null;
    
    for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += ` 
    <div class="col-2">
     <h3>
         ${formatHours(forecast.dt * 1000)}
     </h3>
     <img 
     src="http://openweathermap.org/img/wn/${
         forecast.weather[0].icon
        }@2x.png" 
     alt=""
     class="weather-forecast-img"
     />
     <div class="weather-forecast-temperature">
         <strong>
         ${Math.round(forecast.main.temp_max)}°
         </strong> 
         ${Math.round(forecast.main.temp_min)}°
     </div>
  </div>
  `;
 }
}

function searchCity(city) { 
  let apiKey = "d2991882ca3e5ee6762070360098f550";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

searchCity("Sankt Gallen");

function showCity(event) {
 event.preventDefault();
 let searchInput = document.querySelector("#city-input");
 let city = document.querySelector("#city");
 city.innerHTML = `${searchInput.value}`;

 searchCity(searchInput.value);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", showCity);


function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday","Monday","Thursday","Wednesday","Tuesday","Friday","Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
  
    let days = ["Thu", "Fri", "Sat", "Sun","Mon"];
  
    let forecastHTML = `<div class="row">`;
    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> 18° </span>
            <span class="weather-forecast-temperature-min"> 12° </span>
          </div>
        </div>
    `;
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");
    temperatureElement.innerHTML= Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000); 
    iconElement.setAttribute("src", `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute("alt",`response.data.condition.icon`);
}

function search(city) {
let apiKey ="073c348fbaftb842o6700ee01183a6a5";
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=073c348fbaftb842o6700ee01183a6a5&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}

search("San Francisco");

let apiKey ="073c348fbaftb842o6700ee01183a6a5";
let city = "San Fransisco"; 
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=073c348fbaftb842o6700ee01183a6a5&units=metric`;

axios.get(apiUrl).then(displayTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

displayForecast();
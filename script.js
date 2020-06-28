const iconElement = document.querySelector('.icon-container');
const tempElement = document.querySelector('.temp-value');
const descElement = document.querySelector('.description');
const windElement = document.querySelector('.wind-value');
const rainElement = document.querySelector('.rain.value');

const weather = {};

// GET WEATHER FROM API PROVIDER

function getWeather() {
	let api = `https://api.openweathermap.org/data/2.5/onecall?lat=13.717637&lon=-89.230232&appid=d952b628a09f946583811f297e3af8fd&units=metric`;

	fetch(api)
		.then(function(response) {
			let data = response.json();
			return data;
		})
		.then(function(data) {
			weather.temperature = data.current.temp;
			weather.description = data.current.weather[0].description;
			weather.iconId = data.current.weather[0].icon;
			weather.wind = data.current.wind_speed;
			weather.rain = data.current.rain;
		})
		.then(function() {
			displayWeather();
		});
}

// DISPLAY WEATHER TO UI
function displayWeather() {
	iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}@2x.png"/>`;
	tempElement.innerHTML = `${weather.temperature}°C`;
	windElement.innerHTML = `${weather.wind} m/s`;
	rainElement.innerHTML = weather.rain;
	descElement.innerHTML = weather.description;
}

getWeather();

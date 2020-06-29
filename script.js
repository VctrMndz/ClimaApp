const iconElement = document.querySelector('.icon-container');
const tempElement = document.querySelector('.temp-value');
const descElement = document.querySelector('.description');
const windElement = document.querySelector('.wind-value');
const cloudsElement = document.querySelector('.clouds-value');

/*  3 days forecast*/
const day1DescElement = document.querySelector('[dd1]');
const day1DateElement = document.querySelector('[dn1]');
const day1IconElement = document.querySelector('[di1]');
const day1TempElement = document.querySelector('[dt1]');

const day2DateElement = document.querySelector('[dn2]');
const day2DescElement = document.querySelector('[dd2]');
const day2IconElement = document.querySelector('[di2]');
const day2TempElement = document.querySelector('[dt2]');

const day3DateElement = document.querySelector('[dn3]');
const day3DescElement = document.querySelector('[dd3]');
const day3IconElement = document.querySelector('[di3]');
const day3TempElement = document.querySelector('[dt3]');

const weather = {};

// GET WEATHER FROM API PROVIDER

function getWeather() {
	let api = `https://api.openweathermap.org/data/2.5/onecall?lat=13.717637&lon=-89.230232&appid=d952b628a09f946583811f297e3af8fd&units=metric&exclude=minutely,hourly&lang=sp`;

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
			weather.clouds = data.current.clouds;

			/*  3 days forecast*/
			weather.dn1 = data.daily[1].dt;
			weather.dd1 = data.daily[1].weather[0].description;
			weather.di1 = data.daily[1].weather[0].icon;
			weather.dt1 = data.daily[1].temp.min;
			weather.dt1m = data.daily[1].temp.max;

			weather.dn2 = data.daily[2].dt;
			weather.dd2 = data.daily[2].weather[0].description;
			weather.di2 = data.daily[2].weather[0].icon;
			weather.dt2 = data.daily[2].temp.min;
			weather.dt2m = data.daily[2].temp.max;

			weather.dn3 = data.daily[3].dt;
			weather.dd3 = data.daily[3].weather[0].description;
			weather.di3 = data.daily[3].weather[0].icon;
			weather.dt3 = data.daily[3].temp.min;
			weather.dt3m = data.daily[3].temp.max;
		})
		.then(function() {
			displayWeather();
		});
}

// DISPLAY WEATHER TO UI
function displayWeather() {
	iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}@4x.png"/>`;
	tempElement.innerHTML = ` ${weather.temperature}° C`;
	windElement.innerHTML = `  ${weather.wind} m/s`;
	cloudsElement.innerHTML = ` ${weather.clouds}%`;
	descElement.innerHTML = weather.description[0].toUpperCase() + weather.description.substring(1);

	/*  3 days forecast*/

	day1DescElement.innerHTML = weather.dd1[0].toUpperCase() + weather.dd1.substring(1);
	day1DateElement.innerHTML = new Date(weather.dn1 * 1000).toLocaleDateString('es', { weekday: 'long' });
	day1IconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.di1}@2x.png"/>`;
	day1TempElement.innerHTML = `${weather.dt1}°C min - ${weather.dt1m}°C max `;

	day2DescElement.innerHTML = weather.dd2[0].toUpperCase() + weather.dd2.substring(1);
	day2DateElement.innerHTML = new Date(weather.dn2 * 1000).toLocaleDateString('es', { weekday: 'long' });
	day2IconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.di2}@2x.png"/>`;
	day2TempElement.innerHTML = `${weather.dt2}°C min - ${weather.dt2m}°C max`;

	day3DescElement.innerHTML = weather.dd3[0].toUpperCase() + weather.dd3.substring(1);
	day3DateElement.innerHTML = new Date(weather.dn3 * 1000).toLocaleDateString('es', { weekday: 'long' });
	day3IconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.di3}@2x.png"/>`;
	day3TempElement.innerHTML = `${weather.dt3}°C min - ${weather.dt3m}°C max`;
}

getWeather();

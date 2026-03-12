const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
    forecastUrl: 'https://api.openweathermap.org/data/2.5/forecast'
};

// DOM Elements
const searchInputBox = document.getElementById('input-box');
const searchBtn = document.getElementById('search-btn');
const themeBtn = document.getElementById('theme-btn');

// Dark Mode Toggle
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeBtn.querySelector('i');
    if(document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Event Listeners for Search
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13 && searchInputBox.value.trim() !== "") {
        getWeatherReport(searchInputBox.value);
    }
});

searchBtn.addEventListener('click', () => {
    if (searchInputBox.value.trim() !== "") {
        getWeatherReport(searchInputBox.value);
    }
});

function getWeatherReport(city) {
    // Fetch Current Weather
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(response => response.json())
        .then(showWeaterReport)
        .catch(err => console.log("Error fetching current weather:", err));

    // Fetch 5-Day Forecast
    fetch(`${weatherApi.forecastUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(response => response.json())
        .then(showForecastReport)
        .catch(err => console.log("Error fetching forecast:", err));
}

// Show Current Weather Report
function showWeaterReport(weather) {
    let city_code = weather.cod;
    if (city_code === '400') {
        swal("Empty Input", "Please enter any city", "error");
        reset();
        return;
    } else if (city_code === '404') {
        swal("Bad Input", "Entered city didn't match", "warning");
        reset();
        return;
    }

    let todayDate = new Date();
    let currentWeatherDiv = document.getElementById('current-weather');
    let weatherDetailsDiv = document.getElementById('weather-details');

    // Populate Left Panel (Current Weather)
    currentWeatherDiv.innerHTML = `
        <div class="location-details">
            <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
            <div class="date" id="date">${dateManage(todayDate)}</div>
        </div>
        <div class="weather-status">
            <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C</div>
            <div class="weather" id="weather">${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i></div>
            <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)</div>
            <div class="updated-on">Updated as of ${getTime(todayDate)}</div>
        </div>
    `;

    // Populate Right Panel (Details Grid)
    weatherDetailsDiv.innerHTML = `
        <div class="details-grid">
            <div class="detail-card">
                <i class="fas fa-temperature-high"></i>
                <span>Feels Like</span>
                <p>${weather.main.feels_like}&deg;C</p>
            </div>
            <div class="detail-card">
                <i class="fas fa-tint"></i>
                <span>Humidity</span>
                <p>${weather.main.humidity}%</p>
            </div>
            <div class="detail-card">
                <i class="fas fa-wind"></i>
                <span>Wind</span>
                <p>${weather.wind.speed} km/h</p>
            </div>
            <div class="detail-card">
                <i class="fas fa-tachometer-alt"></i>
                <span>Pressure</span>
                <p>${weather.main.pressure} mb</p>
            </div>
        </div>
    `;

    changeBg(weather.weather[0].main);
    reset();
}

// Show 5-Day Forecast
function showForecastReport(forecastData) {
    if (forecastData.cod !== "200") return;

    const forecastContainer = document.getElementById('forecast-container');
    document.getElementById('forecast-section').style.display = 'block';
    forecastContainer.innerHTML = ""; 

    // Filter to get 1 reading per day (around noon)
    const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const mainWeather = day.weather[0].main;

        forecastContainer.innerHTML += `
            <div class="forecast-card">
                <div class="f-day">${dayName}</div>
                <i class="${getIconClass(mainWeather)}"></i>
                <div class="f-temp">${temp}&deg;C</div>
            </div>
        `;
    });
}

// Utility Functions (Keeping your existing logic intact)
function getTime(todayDate) {
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}

function changeBg(status) {
    // Make sure you have these images in your 'img' folder as referenced in your original code
    if (status === 'Clouds') document.body.style.backgroundImage = 'url(img/clouds.jpg)';
    else if (status === 'Rain') document.body.style.backgroundImage = 'url(img/rainy.jpg)';
    else if (status === 'Clear') document.body.style.backgroundImage = 'url(img/clear.jpg)';
    else if (status === 'Snow') document.body.style.backgroundImage = 'url(img/snow.jpg)';
    else if (status === 'Sunny') document.body.style.backgroundImage = 'url(img/sunny.jpg)';
    else if (status === 'Thunderstorm') document.body.style.backgroundImage = 'url(img/thunderstrom.jpg)';
    else if (status === 'Drizzle') document.body.style.backgroundImage = 'url(img/drizzle.jpg)';
    else if (status === 'Mist' || status === 'Haze' || status === 'Fog') document.body.style.backgroundImage = 'url(img/mist.jpg)';
    else document.body.style.backgroundImage = 'url(img/bg.jpg)';
}

function getIconClass(classarg) {
    if (classarg === 'Rain') return 'fas fa-cloud-showers-heavy';
    else if (classarg === 'Clouds') return 'fas fa-cloud';
    else if (classarg === 'Clear' || classarg === 'Sunny') return 'fas fa-sun';
    else if (classarg === 'Snow') return 'fas fa-snowman';
    else if (classarg === 'Mist' || classarg === 'Haze' || classarg === 'Fog') return 'fas fa-smog';
    else if (classarg === 'Thunderstorm' || classarg === 'Drizzle') return 'fas fa-bolt';
    else return 'fas fa-cloud-sun';
}

function reset() {
    document.getElementById('input-box').value = "";
}

function addZero(i) {
    if (i < 10) i = "0" + i;
    return i;
}
# 🌤️ Weatherly - Modern Weather Dashboard

A responsive, full-screen weather application built with HTML, CSS, and Vanilla JavaScript. This app fetches real-time weather data and a 5-day forecast using the OpenWeatherMap API, wrapped in a sleek "glassmorphism" UI with a built-in Dark/Light mode toggle.

## ✨ Features

* **Real-Time Data:** Search for any city to instantly get current weather conditions, including temperature, humidity, wind speed, and atmospheric pressure.
* **5-Day Forecast:** Displays a quick glance at the upcoming weather for the next 5 days.
* **Dynamic Backgrounds:** The app's background image automatically changes to match the current weather conditions (e.g., sunny, rainy, snowy, cloudy).
* **Dark/Light Mode:** A fully integrated theme toggle that adjusts the UI overlay for comfortable viewing day or night.
* **Modern Glassmorphism UI:** A beautiful, symmetrical split-panel design utilizing CSS backdrops and flexbox for a premium feel.
* **Smart Error Handling:** Alerts users to bad inputs or unfound cities using elegant popups (via SweetAlert).

## 🛠️ Technologies Used

* **HTML5 & CSS3:** Semantic structure with custom CSS variables (`:root`) for theming and responsive design.
* **Vanilla JavaScript (ES6+):** Handles API fetching, DOM manipulation, date formatting, and theme toggling without heavy frameworks.
* **OpenWeatherMap API:** Powers the core data using both the `Current Weather Data` and `5 Day / 3 Hour Forecast` endpoints.
* **FontAwesome:** For intuitive UI icons.
* **SweetAlert:** For clean, non-intrusive error modals.

## 🚀 Getting Started

### Prerequisites
To run this project locally, you will need a free API key from [OpenWeatherMap](https://openweathermap.org/api).

### Installation
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/shantanu812/Weatherly-app.git](https://github.com/shantanu812/Weatherly-app.git)
2. **Navigate to the project folder:**
   ```bash
   cd Weatherly-app
3. **Add your API Key:**
   Open script.js and replace the placeholder API key with your own:
   ```JavaScript
   const weatherApi = {
    key: 'YOUR_API_KEY_HERE',
    baseUrl: '[https://api.openweathermap.org/data/2.5/weather](https://api.openweathermap.org/data/2.5/weather)',
    forecastUrl: '[https://api.openweathermap.org/data/2.5/forecast](https://api.openweathermap.org/data/2.5/forecast)'
    };
4. **Run the App:**
   Simply double-click the index.html file to open it in your default web browser. No local server is strictly required, though using a tool like VS Code's "Live Server" extension is recommended for the best development experience.

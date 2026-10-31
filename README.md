🌦️ Weather App
A clean, responsive weather app for quickly checking current conditions in any city. Search by city name to view real-time weather data powered by the OpenWeatherMap API.

✨ Key Features
🔎 Search for current weather by city name
🌡️ View temperature and weather conditions
💧 Check humidity and wind speed
📱 Responsive interface for desktop and mobile
⚠️ Helpful error handling for invalid cities and network issues
🛠️ Tech Stack
HTML5 CSS3 JavaScript OpenWeatherMap

🚀 How to Run Locally
Prerequisites
Git
A modern web browser
An OpenWeatherMap API key
Setup
Clone the repository:

bash

git clone https://github.com/johnpatricksoriano419-source/weather-app.git
If your repository has a different name, replace weather-app with its name.

Move into the project directory:

bash

cd weather-app
Configure your OpenWeatherMap API key in the JavaScript file where the API request is made.

Keep your API key private. Do not commit it to a public repository.

Start a local development server. For example, with Python:

bash

python -m http.server 8000
Open http://localhost:8000 in your browser.

You can also open index.html directly or use a development server such as the VS Code Live Server extension.

📁 Folder Structure
text

weather-app/
├── index.html       # App markup
├── style.css        # Styles and responsive layout
├── script.js        # Weather search and API logic
└── assets/          # Optional images, icons, or other static files
Update this tree if your project uses different filenames or folders.

🗺️ Future Improvements
[ ] Add a 5-day weather forecast
[ ] Support location-based weather with geolocation
[ ] Add a dark mode
[ ] Display recent or saved city searches
[ ] Add unit switching between Celsius and Fahrenheit

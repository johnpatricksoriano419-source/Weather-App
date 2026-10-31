// src/js/components/current.js
// Isang trabaho lang: isulat ang current weather sa existing HTML.
// Wala itong fetch. Tumanggap lang siya ng data at nag-a-update ng textContent.

import {
  convertTemp,
  describeWeather,
  formatClock,
  formatPressure,
  formatWind,
  weatherVisual,
} from "../utils/format.js";

// Kunin lahat ng element na kailangan natin, isang beses lang.
const els = {
  city: document.querySelector("#current-city"),
  location: document.querySelector("#current-location"),
  temp: document.querySelector("#current-temp"),
  unit: document.querySelector("#current-unit"),
  condition: document.querySelector("#current-condition"),
  visual: document.querySelector("#current-visual"),
  feelsLike: document.querySelector("#current-feels-like"),
  humidity: document.querySelector("#current-humidity"),
  wind: document.querySelector("#current-wind"),
  pressure: document.querySelector("#current-pressure"),
  sunrise: document.querySelector("#current-sunrise"),
  sunset: document.querySelector("#current-sunset"),
  updated: document.querySelector("#current-updated"),
};

export function renderCurrent(weather, place, unit) {
  const current = weather.current;

  // "National Capital Region, Philippines" kung meron,
  // kung wala, country na lang.
  els.city.textContent = place.name;
  els.location.textContent =
    [place.admin1, place.country].filter(Boolean).join(", ") || place.name;

  els.temp.textContent = String(convertTemp(current.temperature_2m, unit));
  els.unit.textContent = `°${unit}`;
  els.condition.textContent = describeWeather(current.weather_code);

  // Palitan lang ang data attribute; CSS ang bahala sa animation.
  els.visual.dataset.visual = weatherVisual(current.weather_code);

  els.feelsLike.textContent = `${convertTemp(current.apparent_temperature, unit)}°`;
  els.humidity.textContent = `${Math.round(current.relative_humidity_2m)}%`;
  els.wind.textContent = formatWind(current.wind_speed_10m, unit);
  els.pressure.textContent = formatPressure(current.surface_pressure);

  // Ang sunrise/sunset ay nasa daily array, unang araw (index 0).
  els.sunrise.textContent = formatClock(weather.daily.sunrise?.[0]);
  els.sunset.textContent = formatClock(weather.daily.sunset?.[0]);

  els.updated.textContent = `Updated ${formatClock(current.time)}`;
}

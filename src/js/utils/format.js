// src/js/utils/format.js
// Mga maliliit na function na nagpapalit ng raw API value
// papunta sa tekstong nakikita ng user. Walang DOM dito.

// WMO weather codes -> simpleng salita.
// Ang Open-Meteo ay numero ang ibinabalik, hindi "Rain" o "Cloudy".
const WEATHER_LABELS = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Freezing fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  56: "Freezing drizzle",
  57: "Heavy freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Light showers",
  81: "Showers",
  82: "Violent showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Severe thunderstorm with hail",
};

export function describeWeather(code) {
  // `??` = kung wala sa listahan, gamitin ang fallback.
  return WEATHER_LABELS[code] ?? "Unknown conditions";
}

// WMO code -> kung aling animation ang ipapakita sa card.
// clear = sun, partly = sun + cloud, at iba pa.
const WEATHER_VISUALS = {
  0: "clear",
  1: "clear",
  2: "partly",
  3: "cloudy",
  45: "fog",
  48: "fog",
  51: "rain",
  53: "rain",
  55: "rain",
  56: "rain",
  57: "rain",
  61: "rain",
  63: "rain",
  65: "rain",
  66: "rain",
  67: "rain",
  71: "snow",
  73: "snow",
  75: "snow",
  77: "snow",
  80: "rain",
  81: "rain",
  82: "storm",
  85: "snow",
  86: "snow",
  95: "storm",
  96: "storm",
  99: "storm",
};

export function weatherVisual(code) {
  return WEATHER_VISUALS[code] ?? "cloudy";
}

/**
 * Ang API ay laging Celsius ang ibinibigay.
 * Dito lang natin ginagawa ang conversion, para isang lugar lang ito.
 */
export function convertTemp(celsius, unit) {
  const value = unit === "F" ? (celsius * 9) / 5 + 32 : celsius;
  return Math.round(value);
}

export function formatWind(kmh, unit) {
  const value = unit === "F" ? kmh * 0.621371 : kmh;
  const suffix = unit === "F" ? "mph" : "km/h";
  return `${Math.round(value)} ${suffix}`;
}

export function formatPressure(hpa) {
  return `${Math.round(hpa)} hPa`;
}

/**
 * Ang API ay nagbabalik ng "2026-10-30T05:52" (walang timezone offset).
 * Ang format na iyon ay oras na ng mismong lokasyon, kaya direkta lang
 * natin itong gawing Date at i-format para sa user.
 */
export function formatClock(isoString) {
  if (!isoString) return "—";

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * "2026-10-30" -> "Today" (kung unang araw) o "Fri".
 * Dinadagdagan natin ng "T00:00:00" para local midnight ang basa,
 * hindi UTC midnight (kung hindi, puwedeng maging isang araw ang liko).
 */
export function formatDay(isoDate, index) {
  if (index === 0) return "Today";

  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;

  return date.toLocaleDateString(undefined, { weekday: "short" });
}

/** "2026-10-30" -> "Oct 30" */
export function formatShortDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

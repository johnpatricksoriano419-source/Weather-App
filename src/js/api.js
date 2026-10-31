// src/js/api.js
// Ang file na ito lang ang may alam kung paano kausapin ang Open-Meteo.
// Wala itong DOM code. Data lang ang ipinapasa niya pabalik.

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

// Ang mga field na hihingin natin sa API.
// Array muna, tapos idudugtong natin ng kuwit para maging isang string.
const CURRENT_FIELDS = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "wind_speed_10m",
  "surface_pressure",
  "weather_code",
];

const DAILY_FIELDS = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "sunrise",
  "sunset",
];

/**
 * Isang maliit na "helper" para sa lahat ng request.
 * Dito lang natin isinusulat ang error handling, hindi sa bawat function.
 */
async function requestJson(url) {
  let response;

  // Ang unang try ay para lang sa fetch().
  // Dito nangyayari ang totoong network failure (walang internet, DNS error).
  try {
    response = await fetch(url);
  } catch {
    throw new Error("Could not reach the weather service. Check your connection.");
  }

  // Tandaan: hindi nag-e-error ang fetch sa 404 o 500.
  // Kaya kailangan nating i-check ang status nang manual.
  if (!response.ok) {
    throw new Error(`The weather service replied with HTTP ${response.status}.`);
  }

  // Pangalawang paghihintay: binabasa pa lang ang body.
  // Kung hindi valid JSON ang sagot, dito ito sasabog.
  try {
    return await response.json();
  } catch {
    throw new Error("The weather service sent a response we could not read.");
  }
}

/**
 * Hanapin ang coordinate ng isang city name.
 * Ang Open-Meteo ay may hiwalay na "geocoding" API para dito.
 */
export async function searchCity(name) {
  const url = new URL(GEOCODING_URL);

  // URLSearchParams ang safe na paraan para magdagdag ng query params.
  // Siya na ang bahala sa pag-encode ng spaces at special characters.
  url.searchParams.set("name", name);
  url.searchParams.set("count", "5");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const data = await requestJson(url);

  // Kung walang nahanap, wala talagang `results` key.
  // `?? []` ang nagsasabing "kung null/undefined, array na lang ang ibalik".
  return data.results ?? [];
}

/**
 * Kunin ang kasalukuyang panahon at 5-day forecast para sa isang coordinate.
 */
export async function getForecast(latitude, longitude) {
  const url = new URL(FORECAST_URL);

  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set("current", CURRENT_FIELDS.join(","));
  url.searchParams.set("daily", DAILY_FIELDS.join(","));
  url.searchParams.set("forecast_days", "5");

  // "auto" = ang timezone ng lokasyon ang gagamitin ng API,
  // kaya tama ang oras ng sunrise/sunset kahit ibang bansa ang hinahanap.
  url.searchParams.set("timezone", "auto");

  // Hindi na kailangan ng `await` dito kasi Promise naman ang ibinabalik
  // ng requestJson(). Ipinapasa lang natin ang Promise pataas.
  return requestJson(url);
}

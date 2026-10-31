// src/js/main.js
// Ito ang "conductor": pinag-uugnay ang API, state, at UI.
// Walang fetch dito at walang malalim na DOM building — tinatawag lang niya
// ang mga tamang function sa tamang oras.

import { getForecast, searchCity } from "./api.js";
import { loadState, setBackground, setPlace, setUnit, setWeather, state } from "./state.js";
import { renderCurrent } from "./components/current.js";
import { renderForecast } from "./components/forecast.js";

// Kapag first visit at walang naka-save na city, Manila ang ipapakita.
const DEFAULT_PLACE = {
  name: "Manila",
  admin1: "Metro Manila",
  country: "Philippines",
  latitude: 14.5995,
  longitude: 120.9842,
};

const els = {
  form: document.querySelector("#search-form"),
  input: document.querySelector("#city-input"),
  button: document.querySelector("#search-button"),
  status: document.querySelector("#status-message"),
  unitToggle: document.querySelector("#unit-toggle"),
  backgroundToggle: document.querySelector("#background-toggle"),
  weatherCard: document.querySelector(".weather-card"),
  forecastList: document.querySelector("#forecast-list"),
};

/**
 * Ipakita ang mensahe sa ilalim ng search box.
 * kind = "loading" | "error" | "idle"
 */
function setStatus(message, kind = "idle") {
  els.status.textContent = message;

  if (kind === "idle") {
    els.status.removeAttribute("data-state");
  } else {
    els.status.dataset.state = kind;
  }
}

/**
 * Habang naghihintay ng data: i-disable ang button
 * at sabihan ang screen reader na busy ang card at listahan.
 */
function setLoading(isLoading) {
  els.button.disabled = isLoading;
  els.weatherCard.setAttribute("aria-busy", String(isLoading));
  els.forecastList.setAttribute("aria-busy", String(isLoading));
}

/** I-render ang lahat ng nakikita, base sa kasalukuyang state. */
function renderAll() {
  if (!state.weather || !state.place) return;

  renderCurrent(state.weather, state.place, state.unit);
  renderForecast(state.weather, state.unit);
}

/** Ang button ay nagpapakita ng KASALUKUYANG unit; click = palitan. */
function syncUnitButton() {
  const next = state.unit === "C" ? "F" : "C";
  const nextName = next === "C" ? "Celsius" : "Fahrenheit";

  els.unitToggle.textContent = `°${state.unit}`;
  els.unitToggle.setAttribute("aria-label", `Switch to degrees ${nextName}`);
  els.unitToggle.title = `Switch to °${next}`;
}

/**
 * I-apply ang background sa <html> (CSS ang magbabago ng colors),
 * tapos i-update ang pressed state ng button.
 */
function syncBackgroundButton() {
  const isWhite = state.background === "white";

  document.documentElement.dataset.background = state.background;
  els.backgroundToggle.setAttribute("aria-pressed", String(isWhite));
  els.backgroundToggle.setAttribute(
    "aria-label",
    isWhite ? "Switch to default background" : "Switch to white background"
  );
}

/**
 * Kunin ang weather ng isang lugar, i-save sa state, tapos i-render.
 * Ito ang isang lugar kung saan nangyayari ang fetch — kapag tinawag ito.
 */
async function loadPlace(place) {
  setLoading(true);
  setStatus(`Loading weather for ${place.name}…`, "loading");

  try {
    const weather = await getForecast(place.latitude, place.longitude);

    setPlace(place); // dito nase-save sa localStorage
    setWeather(weather);
    renderAll();

    setStatus(""); // successful = walang mensahe, tahimik lang
  } catch (error) {
    // Ang error.message ay galing sa api.js, kaya madaling basahin.
    setStatus(error.message, "error");
  } finally {
    // finally = tumatakbo kahit success o fail.
    // Kaya hindi maiiwan na disabled ang button.
    setLoading(false);
  }
}

/** Submit handler ng search form. */
async function handleSearch(event) {
  event.preventDefault(); // pigilan ang page refresh

  // Kung may tumatakbo pang request, huwag nang magsimula ng bago.
  // (Nangyayari ito kapag pinindot ang Enter habang naglo-load.)
  if (els.button.disabled) return;

  const query = els.input.value.trim();

  if (!query) {
    setStatus("Type a city name first.", "error");
    els.input.focus();
    return;
  }

  setLoading(true);
  setStatus(`Searching for “${query}”…`, "loading");

  try {
    const results = await searchCity(query);

    if (results.length === 0) {
      setStatus(`No city found for “${query}”. Try a different spelling.`, "error");
      return;
    }

    // Pinipili muna natin ang unang resulta (pinaka-malapit na match).
    const match = results[0];

    const place = {
      name: match.name,
      admin1: match.admin1 ?? "",
      country: match.country ?? "",
      latitude: match.latitude,
      longitude: match.longitude,
    };

    // loadPlace() na ang bahala sa susunod na loading/error state.
    await loadPlace(place);
  } catch (error) {
    setStatus(error.message, "error");
  } finally {
    setLoading(false);
  }
}

/** °C <-> °F nang WALANG bagong fetch, kasi nasa memory na ang data. */
function handleUnitToggle() {
  setUnit(state.unit === "C" ? "F" : "C");
  syncUnitButton();
  renderAll();
}

/** Default background <-> pure white. CSS lang ang nagbabago, walang fetch. */
function handleBackgroundToggle() {
  setBackground(state.background === "white" ? "default" : "white");
  syncBackgroundButton();
}

/** Simula ng app. */
async function init() {
  loadState(); // basahin ang unit at huling city
  syncUnitButton();
  syncBackgroundButton();

  els.form.addEventListener("submit", handleSearch);
  els.unitToggle.addEventListener("click", handleUnitToggle);
  els.backgroundToggle.addEventListener("click", handleBackgroundToggle);

  // Kung may naka-save na lugar, iyon ang buksan. Kung wala, Manila.
  await loadPlace(state.place ?? DEFAULT_PLACE);
}

init();

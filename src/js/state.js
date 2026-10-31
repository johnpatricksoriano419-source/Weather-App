// src/js/state.js
// Ito ang "memory" ng app: ano ang unit, anong lugar, anong data.
// Ang localStorage ay para hindi mawala ang unit at huling city pag-refresh.

const STORAGE_KEY = "jp-weather";

export const state = {
  unit: "C", // "C" o "F"
  background: "default", // "default" o "white"
  place: null, // { name, admin1, country, latitude, longitude }
  weather: null, // ang buong sagot ng forecast API
};

/**
 * Basahin ang naka-save na unit at lugar.
 * May try/catch kasi puwedeng sirain ng user ang localStorage
 * o naka-off ito sa private browsing.
 */
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const saved = JSON.parse(raw);

    if (saved.unit === "C" || saved.unit === "F") {
      state.unit = saved.unit;
    }

    if (saved.background === "default" || saved.background === "white") {
      state.background = saved.background;
    }

    const place = saved.place;
    if (place && Number.isFinite(place.latitude) && Number.isFinite(place.longitude)) {
      state.place = place;
    }
  } catch (error) {
    console.warn("[state] Could not read saved state:", error);
  }
}

export function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        unit: state.unit,
        background: state.background,
        place: state.place,
      })
    );
  } catch (error) {
    console.warn("[state] Could not save state:", error);
  }
}

export function setUnit(unit) {
  state.unit = unit;
  saveState();
}

export function setBackground(background) {
  state.background = background;
  saveState();
}

export function setPlace(place) {
  state.place = place;
  saveState();
}

export function setWeather(weather) {
  // Hindi ito sine-save sa localStorage: masyadong malaki at mabilis maluma.
  state.weather = weather;
}

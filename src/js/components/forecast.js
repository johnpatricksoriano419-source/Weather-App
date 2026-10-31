// src/js/components/forecast.js
// Gumagawa ng 5 card para sa forecast, gamit ang <template> sa index.html.

import {
  convertTemp,
  describeWeather,
  formatDay,
  formatShortDate,
  weatherVisual,
} from "../utils/format.js";

const list = document.querySelector("#forecast-list");
const template = document.querySelector("#forecast-card-template");

export function renderForecast(weather, unit) {
  const daily = weather.daily;

  // Burahin ang lumang cards (o ang empty state) bago maglagay ng bago.
  list.replaceChildren();

  if (!daily?.time?.length) {
    const empty = document.createElement("li");
    empty.className = "forecast-empty";
    empty.textContent = "Forecast is not available for this location.";
    list.append(empty);
    return;
  }

  // DocumentFragment = parang invisible na container.
  // Isang beses lang natin ito idadagdag sa page, kaya isang reflow lang.
  const fragment = document.createDocumentFragment();

  daily.time.forEach((date, index) => {
    // cloneNode(true) = kopyahin ang template pati mga anak niya.
    const card = template.content.cloneNode(true);

    card.querySelector(".forecast-card__day").textContent = formatDay(date, index);
    card.querySelector(".forecast-card__date").textContent = formatShortDate(date);
    card.querySelector(".forecast-card__condition").textContent = describeWeather(
      daily.weather_code[index]
    );

    // Isang mini icon bawat araw, pareho ang mapping sa malaking card.
    const visual = weatherVisual(daily.weather_code[index]);
    card
      .querySelector(".forecast-card__icon use")
      .setAttribute("href", `#wv-icon-${visual}`);

    card.querySelector(".forecast-card__high").textContent =
      `${convertTemp(daily.temperature_2m_max[index], unit)}°`;
    card.querySelector(".forecast-card__low").textContent =
      `${convertTemp(daily.temperature_2m_min[index], unit)}°`;

    fragment.append(card);
  });

  list.append(fragment);
}

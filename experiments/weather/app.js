
"use strict";

/* =========================================
   WEATHER APP
   Weather data: Open-Meteo
   Earth globe: MapLibre GL JS
========================================= */

const API = {
  geocoding: "https://geocoding-api.open-meteo.com/v1/search",
  forecast: "https://api.open-meteo.com/v1/forecast",
  airQuality: "https://air-quality-api.open-meteo.com/v1/air-quality"
};

const $ = (id) => document.getElementById(id);

const state = {
  city: null,
  weather: null,
  air: null,
  unit: "celsius",
  favorites: loadFavorites(),
  map: null,
  marker: null,
  mapReady: false
};

/* =========================================
   WEATHER CODE INFORMATION
========================================= */

function getWeatherInfo(code, isDay = true) {
  const weather = {
    0: ["Clear sky", isDay ? "☀️" : "🌙"],
    1: ["Mainly clear", isDay ? "🌤️" : "🌙"],
    2: ["Partly cloudy", "⛅"],
    3: ["Overcast", "☁️"],
    45: ["Fog", "🌫️"],
    48: ["Depositing rime fog", "🌫️"],
    51: ["Light drizzle", "🌦️"],
    53: ["Moderate drizzle", "🌦️"],
    55: ["Dense drizzle", "🌧️"],
    56: ["Freezing drizzle", "🌧️"],
    57: ["Heavy freezing drizzle", "🌧️"],
    61: ["Slight rain", "🌦️"],
    63: ["Moderate rain", "🌧️"],
    65: ["Heavy rain", "🌧️"],
    66: ["Freezing rain", "🌧️"],
    67: ["Heavy freezing rain", "🌧️"],
    71: ["Slight snowfall", "🌨️"],
    73: ["Moderate snowfall", "❄️"],
    75: ["Heavy snowfall", "❄️"],
    77: ["Snow grains", "🌨️"],
    80: ["Rain showers", "🌦️"],
    81: ["Moderate rain showers", "🌧️"],
    82: ["Violent rain showers", "⛈️"],
    85: ["Snow showers", "🌨️"],
    86: ["Heavy snow showers", "❄️"],
    95: ["Thunderstorm", "⛈️"],
    96: ["Thunderstorm with hail", "⛈️"],
    99: ["Severe thunderstorm with hail", "⛈️"]
  };

  return weather[code] || ["Unknown conditions", "🌡️"];
}

function iconData(emoji) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <text x="50%" y="53%" dominant-baseline="middle"
        text-anchor="middle" font-size="76">${emoji}</text>
    </svg>
  `;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* =========================================
   DATE AND NUMBER HELPERS
========================================= */

function formatDate(dateString, options = {}) {
  if (!dateString) return "--";

  const date = new Date(dateString + "T12:00:00");

  return date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    ...options
  });
}

function formatTime(dateString) {
  if (!dateString) return "--";

  const date = new Date(dateString);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function number(value, digits = 0) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) {
    return "--";
  }

  return Number(value).toFixed(digits);
}

function temperature(value) {
  if (value === null || value === undefined) return "--";

  if (state.unit === "fahrenheit") {
    return `${Math.round((value * 9) / 5 + 32)}°`;
  }

  return `${Math.round(value)}°`;
}

function windSpeed(value) {
  if (value === null || value === undefined) return "--";

  if (state.unit === "fahrenheit") {
    return `${number(value * 0.621371)} mph`;
  }

  return `${number(value)} km/h`;
}

function setStatus(message, type = "") {
  const element = $("status");
  if (!element) return;

  element.textContent = message;
  element.className = "status";

  if (type) element.classList.add(type);
}

/* =========================================
   FETCH HELPERS
========================================= */

async function fetchJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.json();
}

/* =========================================
   CITY SEARCH
========================================= */

async function searchCity(query) {
  const url = new URL(API.geocoding);

  url.search = new URLSearchParams({
    name: query,
    count: "1",
    language: "en",
    format: "json"
  });

  const data = await fetchJSON(url);

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found. Try another city name.");
  }

  return data.results[0];
}

async function loadCity(query) {
  if (!query || !query.trim()) {
    setStatus("Please enter a city name.", "error");
    return;
  }

  setStatus("Searching for your city...");

  try {
    const city = await searchCity(query.trim());
    await loadWeather(city);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Could not find that city.", "error");
  }
}

/* =========================================
   WEATHER DATA
========================================= */

async function loadWeather(city) {
  setStatus(`Loading weather for ${city.name}...`);

  const params = new URLSearchParams({
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: "auto",
    forecast_days: "7",
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation_probability",
      "weather_code",
      "wind_speed_10m",
      "is_day"
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "uv_index_max",
      "precipitation_probability_max"
    ].join(","),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m"
    ].join(",")
  });

  try {
    const weather = await fetchJSON(`${API.forecast}?${params}`);

    state.city = city;
    state.weather = weather;

    renderDashboard();
    updateEarthLocation(city);

    loadAirQuality(city).catch((error) => {
      console.warn("Air quality could not be loaded:", error);
      renderAirQuality(null);
    });

    setStatus(`Weather updated for ${city.name}.`, "success");
  } catch (error) {
    console.error(error);
    setStatus("Unable to load weather data. Please try again.", "error");
    throw error;
  }
}

/* =========================================
   DASHBOARD RENDERING
========================================= */

function renderDashboard() {
  if (!state.city || !state.weather) return;

  const city = state.city;
  const weather = state.weather;
  const current = weather.current;
  const daily = weather.daily;

  $("dashboard")?.removeAttribute("hidden");

  if ($("city-name")) {
    $("city-name").textContent = city.name;
  }

  if ($("current-date")) {
    $("current-date").textContent = formatDate(
      current.time?.slice(0, 10) || new Date().toISOString().slice(0, 10)
    );
  }

  const info = getWeatherInfo(current.weather_code, current.is_day === 1);

  if ($("temperature")) {
    $("temperature").textContent = temperature(current.temperature_2m);
  }

  if ($("condition")) {
    $("condition").textContent = info[0];
  }

  if ($("feels-like")) {
    $("feels-like").textContent =
      `Feels like ${temperature(current.apparent_temperature)}`;
  }

  if ($("weather-icon")) {
    $("weather-icon").src = iconData(info[1]);
    $("weather-icon").alt = info[0];
  }

  setText("humidity", `${number(current.relative_humidity_2m)}%`);
  setText("wind", windSpeed(current.wind_speed_10m));
  setText("precipitation", `${number(current.precipitation, 1)} mm`);

  setText("sunrise", formatTime(daily.sunrise?.[0]));
  setText("sunset", formatTime(daily.sunset?.[0]));

  renderUV(daily.uv_index_max?.[0]);
  renderHourly();
  renderDaily();
  renderDetails();
  renderChart();
  renderFavorites();
  updateFavoriteButton();
}

function setText(id, value) {
  const element = $(id);
  if (element) element.textContent = value;
}

/* =========================================
   UV INDEX
========================================= */

function renderUV(value) {
  const uv = Number(value);

  if (!Number.isFinite(uv)) {
    setText("uv-value", "--");
    setText("uv-label", "Unavailable");
    setText("uv-advice", "UV information is currently unavailable.");

    if ($("uv-meter")) $("uv-meter").style.width = "0%";
    return;
  }

  let label = "Low";
  let advice = "Enjoy being outdoors. Normal sun protection is recommended.";

  if (uv >= 3 && uv < 6) {
    label = "Moderate";
    advice = "Consider sunscreen, sunglasses, and shade during midday.";
  } else if (uv >= 6 && uv < 8) {
    label = "High";
    advice = "Use sunscreen, protective clothing, and seek shade.";
  } else if (uv >= 8 && uv < 11) {
    label = "Very high";
    advice = "Reduce time in the sun and use strong sun protection.";
  } else if (uv >= 11) {
    label = "Extreme";
    advice = "Avoid direct sunlight during peak UV hours.";
  }

  setText("uv-value", number(uv, 1));
  setText("uv-label", label);
  setText("uv-advice", advice);

  const meter = $("uv-meter");

  if (meter) {
    meter.style.width = `${Math.min(100, (uv / 11) * 100)}%`;
  }
}

/* =========================================
   HOURLY FORECAST
========================================= */

function renderHourly() {
  const container = $("hourly-forecast");
  if (!container || !state.weather) return;

  const hourly = state.weather.hourly;
  const now = new Date(state.weather.current.time).getTime();

  let startIndex = hourly.time.findIndex(
    (time) => new Date(time).getTime() >= now
  );

  if (startIndex < 0) startIndex = 0;

  const items = hourly.time.slice(startIndex, startIndex + 8);

  container.innerHTML = items.map((time, index) => {
    const i = startIndex + index;

    const info = getWeatherInfo(
      hourly.weather_code[i],
      hourly.is_day?.[i] === 1
    );

    const label = index === 0 ? "Now" : formatTime(time);

    return `
      <div class="hour-card">
        <span class="hour-time">${label}</span>
        <img class="hour-icon" src="${iconData(info[1])}" alt="${info[0]}">
        <strong class="hour-temp">${temperature(hourly.temperature_2m[i])}</strong>
        <span class="hour-time">${number(hourly.precipitation_probability[i])}% rain</span>
      </div>
    `;
  }).join("");
}

/* =========================================
   DAILY FORECAST
========================================= */

function renderDaily() {
  const container = $("daily-forecast");
  if (!container || !state.weather) return;

  const daily = state.weather.daily;

  container.innerHTML = daily.time.map((date, index) => {
    const info = getWeatherInfo(daily.weather_code[index]);

    const dayName = index === 0
      ? "Today"
      : new Date(date + "T12:00:00").toLocaleDateString(undefined, {
          weekday: "short"
        });

    return `
      <div class="day-row">
        <span class="day-name">${dayName}</span>
        <img class="day-icon" src="${iconData(info[1])}" alt="${info[0]}">
        <div class="day-temperatures">
          <span class="day-high">${temperature(daily.temperature_2m_max[index])}</span>
          <span class="day-low">${temperature(daily.temperature_2m_min[index])}</span>
        </div>
        <span class="day-rain">${number(daily.precipitation_probability_max[index])}% rain</span>
      </div>
    `;
  }).join("");
}

/* =========================================
   WEATHER DETAILS
========================================= */

function renderDetails() {
  const current = state.weather.current;

  setText("detail-feels", temperature(current.apparent_temperature));
  setText("detail-humidity", `${number(current.relative_humidity_2m)}%`);
  setText("detail-direction", `${number(current.wind_direction_10m)}°`);
  setText("detail-rain", `${number(current.precipitation, 1)} mm`);
}

/* =========================================
   TEMPERATURE CHART
========================================= */

function renderChart() {
  const svg = $("temperature-chart");
  const labels = $("chart-labels");

  if (!svg || !state.weather) return;

  const hourly = state.weather.hourly;
  const now = new Date(state.weather.current.time).getTime();

  let start = hourly.time.findIndex(
    (time) => new Date(time).getTime() >= now
  );

  if (start < 0) start = 0;

  const values = hourly.temperature_2m.slice(start, start + 12);

  if (values.length < 2) return;

  const min = Math.min(...values) - 2;
  const max = Math.max(...values) + 2;
  const range = max - min || 1;

  const width = 700;
  const height = 170;
  const paddingX = 20;
  const paddingY = 25;

  const points = values.map((value, index) => {
    const x = paddingX +
      (index / (values.length - 1)) * (width - paddingX * 2);

    const y = height - paddingY -
      ((value - min) / range) * (height - paddingY * 2);

    return { x, y, value };
  });

  const line = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const area = `${line} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  svg.innerHTML = `
    <defs>
      <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#54c8ff" stop-opacity=".30"/>
        <stop offset="100%" stop-color="#54c8ff" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <path d="${area}" fill="url(#chart-fill)"></path>

    <path d="${line}"
      fill="none"
      stroke="#54c8ff"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"></path>

    ${points.map((point) => `
      <circle cx="${point.x}" cy="${point.y}" r="4"
        fill="#54c8ff" stroke="#101a2b" stroke-width="2"></circle>
    `).join("")}
  `;

  if (labels) {
    labels.innerHTML = points.map((point, index) => {
      const time = hourly.time[start + index];

      return `<span>${formatTime(time)}</span>`;
    }).join("");
  }
}

/* =========================================
   AIR QUALITY
========================================= */

async function loadAirQuality(city) {
  const params = new URLSearchParams({
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: "auto",
    current: [
      "european_aqi",
      "us_aqi",
      "pm10",
      "pm2_5"
    ].join(",")
  });

  const data = await fetchJSON(`${API.airQuality}?${params}`);

  state.air = data;
  renderAirQuality(data);
}

function renderAirQuality(data) {
  const container = $("air-content");
  if (!container) return;

  if (!data?.current) {
    container.innerHTML = `
      <div class="air-score">--</div>
      <div>
        <p class="air-description">Air quality unavailable</p>
        <p class="air-note">Air quality data could not be retrieved right now.</p>
      </div>
    `;
    return;
  }

  const current = data.current;
  const aqi = current.european_aqi ?? current.us_aqi;

  let quality = "Good";
  let note = "Air quality is satisfactory.";

  if (aqi > 20 && aqi <= 40) {
    quality = "Fair";
    note = "Air quality is acceptable for most people.";
  } else if (aqi > 40 && aqi <= 60) {
    quality = "Moderate";
    note = "Sensitive people may experience some effects.";
  } else if (aqi > 60 && aqi <= 80) {
    quality = "Poor";
    note = "Consider reducing prolonged outdoor activity.";
  } else if (aqi > 80 && aqi <= 100) {
    quality = "Very poor";
    note = "Limit outdoor activity if you are sensitive.";
  } else if (aqi > 100) {
    quality = "Extremely poor";
    note = "Avoid prolonged outdoor activity.";
  }

  container.innerHTML = `
    <div class="air-score">${number(aqi)}</div>
    <div>
      <p class="air-description">${quality}</p>
      <p class="air-note">${note}</p>
      <p class="air-note">
        PM2.5: ${number(current.pm2_5, 1)} μg/m³ ·
        PM10: ${number(current.pm10, 1)} μg/m³
      </p>
    </div>
  `;
}

/* =========================================
   FAVORITES
========================================= */

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem("weatherFavorites") || "[]");
  } catch {
    return [];
  }
}

function saveFavorites() {
  localStorage.setItem("weatherFavorites", JSON.stringify(state.favorites));
}

function isFavorite(city) {
  if (!city) return false;

  return state.favorites.some(
    (item) =>
      item.name.toLowerCase() === city.name.toLowerCase() &&
      Math.abs(item.latitude - city.latitude) < 0.01 &&
      Math.abs(item.longitude - city.longitude) < 0.01
  );
}

function toggleFavorite() {
  if (!state.city) return;

  if (isFavorite(state.city)) {
    state.favorites = state.favorites.filter(
      (item) => !(
        item.name.toLowerCase() === state.city.name.toLowerCase() &&
        Math.abs(item.latitude - state.city.latitude) < 0.01 &&
        Math.abs(item.longitude - state.city.longitude) < 0.01
      )
    );
  } else {
    state.favorites.push({
      name: state.city.name,
      country: state.city.country,
      latitude: state.city.latitude,
      longitude: state.city.longitude
    });
  }

  saveFavorites();
  renderFavorites();
  updateFavoriteButton();
}

function renderFavorites() {
  const container = $("favorites");
  if (!container) return;

  container.innerHTML = state.favorites.map((city, index) => `
    <button class="favorite-chip" type="button" data-favorite="${index}">
      ${escapeHTML(city.name)}
    </button>
  `).join("");

  container.querySelectorAll("[data-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      const city = state.favorites[Number(button.dataset.favorite)];
      if (city) loadWeather(city).catch(console.error);
    });
  });
}

function updateFavoriteButton() {
  const button = $("favorite-button");
  if (!button) return;

  const favorite = isFavorite(state.city);

  button.textContent = favorite ? "★" : "☆";
  button.setAttribute(
    "aria-label",
    favorite ? "Remove from favorites" : "Add to favorites"
  );
  button.title = favorite ? "Remove from favorites" : "Add to favorites";
}

/* =========================================
   BASIC HTML ESCAPING
========================================= */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

/* =========================================
   UNIT TOGGLE
========================================= */

function toggleUnits() {
  state.unit = state.unit === "celsius" ? "fahrenheit" : "celsius";

  const button = $("unit-toggle");

  if (button) {
    button.textContent = state.unit === "celsius" ? "°C" : "°F";
  }

  if (state.weather) {
    renderDashboard();
  }
}

/* =========================================
   USER LOCATION
========================================= */

function useCurrentLocation() {
  if (!navigator.geolocation) {
    setStatus("Location services are not supported by this browser.", "error");
    return;
  }

  setStatus("Getting your current location...");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const city = {
        name: "My location",
        country: "",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      try {
        const params = new URLSearchParams({
          latitude: city.latitude,
          longitude: city.longitude,
          count: "1",
          language: "en",
          format: "json"
        });

        const data = await fetchJSON(`${API.geocoding}?${params}`);

        if (data.results?.[0]) {
          city.name = data.results[0].name;
          city.country = data.results[0].country || "";
        }

        await loadWeather(city);
      } catch (error) {
        console.error(error);
        setStatus("Could not load weather for your location.", "error");
      }
    },
    (error) => {
      console.warn(error);

      if (error.code === error.PERMISSION_DENIED) {
        setStatus("Location permission was denied. Search for a city instead.", "error");
      } else {
        setStatus("Could not determine your location.", "error");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 300000
    }
  );
}

/* =========================================
   EARTH GLOBE
   Requires MapLibre GL JS in index.html.
========================================= */

function initEarth() {
  const container = $("earth-globe");

  if (!container) return;

  if (typeof maplibregl === "undefined") {
    console.error("MapLibre GL JS did not load. Check the MapLibre script in index.html.");

    container.innerHTML = `
      <div class="empty-state">
        Earth globe could not load. Check your internet connection and MapLibre script.
      </div>
    `;

    return;
  }

  try {
    state.map = new maplibregl.Map({
      container: "earth-globe",

      style: {
        version: 8,

        sources: {
          satellite: {
            type: "raster",

            tiles: [
              "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg"
            ],

            tileSize: 256,
            attribution: "Satellite imagery © EOX"
          }
        },

        layers: [
          {
            id: "satellite-layer",
            type: "raster",
            source: "satellite",
            minzoom: 0,
            maxzoom: 18
          }
        ],

        projection: {
          type: "globe"
        }
      },

      center: [0, 20],
      zoom: 1.4,
      minZoom: 1,
      maxZoom: 8,
      attributionControl: true
    });

    state.map.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true
      }),
      "top-right"
    );

    /* =====================================
       FIXED GLOBE ATMOSPHERE

       MapLibre uses setSky().
       Do NOT use setFog() here.
    ===================================== */

    state.map.on("load", () => {
      state.mapReady = true;

      try {
        if (typeof state.map.setSky === "function") {
          state.map.setSky({
            "sky-color": "rgb(3, 8, 18)",
            "horizon-color": "rgb(30, 75, 120)",
            "fog-color": "rgb(10, 20, 35)",
            "fog-ground-blend": 0.5,
            "horizon-fog-blend": 0.5,
            "sky-horizon-blend": 0.5,
            "atmosphere-blend": 1.0
          });
        } else {
          console.warn(
            "This MapLibre version does not support setSky(). Globe atmosphere was skipped."
          );
        }
      } catch (error) {
        console.warn("Globe atmosphere could not be enabled:", error);
      }

      if (state.city) {
        updateEarthLocation(state.city);
      }
    });

    state.map.on("error", (event) => {
      console.warn("MapLibre map error:", event.error || event);
    });

  } catch (error) {
    console.error("Could not initialize the Earth globe:", error);

    container.innerHTML = `
      <div class="empty-state">
        Unable to initialize the Earth globe.
      </div>
    `;
  }
}

/* =========================================
   UPDATE EARTH LOCATION
========================================= */

function updateEarthLocation(city) {
  if (!city) return;

  setText("earth-city", city.name);
  setText("earth-country", city.country || "Location selected");
  setText("earth-lat", number(city.latitude, 3));
  setText("earth-lon", number(city.longitude, 3));

  if (!state.map || !state.mapReady) return;

  const coordinates = [city.longitude, city.latitude];

  if (!state.marker) {
    state.marker = new maplibregl.Marker({
      color: "#54c8ff"
    })
      .setLngLat(coordinates)
      .addTo(state.map);
  } else {
    state.marker.setLngLat(coordinates);
  }

  state.map.flyTo({
    center: coordinates,
    zoom: 3,
    speed: 0.8,
    curve: 1.4,
    essential: true
  });
}

/* =========================================
   REFRESH
========================================= */

async function refreshWeather() {
  if (!state.city) {
    setStatus("Search for a city first.", "error");
    return;
  }

  try {
    await loadWeather(state.city);
  } catch (error) {
    console.error(error);
  }
}

/* =========================================
   EVENT LISTENERS
========================================= */

function setupEventListeners() {
  const form = $("search-form");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = $("city-input")?.value;
    loadCity(query);
  });

  $("location-button")?.addEventListener("click", useCurrentLocation);
  $("refresh-button")?.addEventListener("click", refreshWeather);
  $("unit-toggle")?.addEventListener("click", toggleUnits);
  $("favorite-button")?.addEventListener("click", toggleFavorite);
}

/* =========================================
   START APPLICATION
========================================= */

async function startWeatherApp() {
  setupEventListeners();
  renderFavorites();
  initEarth();

  const defaultCity = {
    name: "Helsinki",
    country: "Finland",
    latitude: 60.1699,
    longitude: 24.9384
  };

  try {
    await loadWeather(defaultCity);
  } catch (error) {
    console.error("Initial weather load failed:", error);

    setStatus(
      "Weather could not be loaded. Search for a city to try again.",
      "error"
    );
  }
}

document.addEventListener("DOMContentLoaded", startWeatherApp);

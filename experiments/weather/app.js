
// ============================================
// WEATHER INTELLIGENCE 3.0
// Weather + Air Quality + Forecasts + 3D Earth
// Data: Open-Meteo
// Globe: MapLibre GL
// ============================================

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const AIR_API = "https://air-quality-api.open-meteo.com/v1/air-quality";
const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";

// Satellite tiles: EOX Sentinel-2 cloudless mosaic (2020).

// App state
let currentPlace = {
  name: "Helsinki",
  country: "Finland",
  latitude: 60.1699,
  longitude: 24.9384
};

let weatherData = null;
let airData = null;
let useCelsius = true;
let favorites = loadFavorites();

// Request counters prevent outdated searches or API responses
// from replacing the newest selected location.
let dashboardRequestId = 0;
let citySearchRequestId = 0;

// Globe state
let earthMap = null;
let earthMarker = null;
let earthInitialized = false;

// ============================================
// ELEMENTS
// ============================================

const $ = (id) => document.getElementById(id);

const searchForm = $("search-form");
const cityInput = $("city-input");
const locationButton = $("location-button");
const refreshButton = $("refresh-button");
const unitToggle = $("unit-toggle");
const favoriteButton = $("favorite-button");
const statusBox = $("status");
const dashboard = $("dashboard");

// ============================================
// WEATHER DESCRIPTIONS
// ============================================

function getWeatherInfo(code, isDay = true) {
  const conditions = {
    0: ["Clear sky", isDay ? "☀️" : "🌙"],
    1: ["Mainly clear", isDay ? "🌤️" : "🌙"],
    2: ["Partly cloudy", "⛅"],
    3: ["Overcast", "☁️"],
    45: ["Foggy", "🌫️"],
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
    73: ["Moderate snowfall", "🌨️"],
    75: ["Heavy snowfall", "❄️"],
    77: ["Snow grains", "❄️"],
    80: ["Rain showers", "🌦️"],
    81: ["Moderate showers", "🌧️"],
    82: ["Violent showers", "⛈️"],
    85: ["Snow showers", "🌨️"],
    86: ["Heavy snow showers", "❄️"],
    95: ["Thunderstorm", "⛈️"],
    96: ["Thunderstorm with hail", "⛈️"],
    99: ["Heavy thunderstorm", "⛈️"]
  };

  return conditions[code] || ["Unknown conditions", "🌡️"];
}

// ============================================
// HELPERS
// ============================================

function setStatus(message, isError = false) {
  if (!statusBox) return;

  statusBox.textContent = message;
  statusBox.classList.toggle("error", isError);
}

function round(value) {
  return value == null ? "--" : Math.round(value);
}

function temperature(value) {
  if (value == null) return "--°";

  const converted = useCelsius
    ? value
    : (value * 9 / 5) + 32;

  return `${Math.round(converted)}°`;
}

function windDirection(degrees) {
  if (degrees == null) return "--";

  const directions = [
    "N", "NE", "E", "SE",
    "S", "SW", "W", "NW"
  ];

  return directions[Math.round(degrees / 45) % 8];
}

function formatTime(time) {
  if (!time) return "--:--";
  return time.slice(11, 16);
}

function formatDay(date, index) {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";

  return new Date(`${date}T12:00:00`).toLocaleDateString(
    undefined,
    { weekday: "short" }
  );
}

function getClosestIndex(times, targetTime) {
  if (!times || !times.length) return 0;

  const target = new Date(targetTime).getTime();

  let closest = 0;
  let smallestDifference = Infinity;

  times.forEach((time, index) => {
    const difference = Math.abs(
      new Date(time).getTime() - target
    );

    if (difference < smallestDifference) {
      smallestDifference = difference;
      closest = index;
    }
  });

  return closest;
}

function getAQIInfo(aqi) {
  if (aqi == null) {
    return {
      label: "Unavailable",
      advice: "Air quality information is not available right now.",
      color: "#9299b7"
    };
  }

  if (aqi <= 50) {
    return {
      label: "Good",
      advice: "Air quality is considered satisfactory. Enjoy your usual outdoor activities.",
      color: "#69dba5"
    };
  }

  if (aqi <= 100) {
    return {
      label: "Moderate",
      advice: "Air quality is acceptable. Unusually sensitive people may wish to take care.",
      color: "#e4cf70"
    };
  }

  if (aqi <= 150) {
    return {
      label: "Unhealthy for sensitive groups",
      advice: "Sensitive individuals may want to reduce prolonged or intense outdoor activity.",
      color: "#edaa65"
    };
  }

  if (aqi <= 200) {
    return {
      label: "Unhealthy",
      advice: "Consider reducing prolonged outdoor activity, especially if you are sensitive to pollution.",
      color: "#ed827e"
    };
  }

  if (aqi <= 300) {
    return {
      label: "Very unhealthy",
      advice: "Avoid prolonged outdoor exertion. Consider spending more time indoors.",
      color: "#b994ec"
    };
  }

  return {
    label: "Hazardous",
    advice: "Avoid outdoor exertion and follow local public-health guidance.",
    color: "#d879b7"
  };
}

// ============================================
// FETCH WEATHER DATA
// ============================================

async function fetchWeather(place = currentPlace) {
  const { latitude, longitude } = place;

  const params = new URLSearchParams({
    latitude,
    longitude,
    timezone: "auto",
    forecast_days: "7",

    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
      "is_day"
    ].join(","),

    hourly: [
      "temperature_2m",
      "precipitation_probability",
      "weather_code",
      "uv_index"
    ].join(","),

    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "uv_index_max"
    ].join(",")
  });

  const response = await fetch(`${WEATHER_API}?${params}`);

  if (!response.ok) {
    throw new Error("Could not retrieve weather data.");
  }

  return response.json();
}

// ============================================
// FETCH AIR QUALITY DATA
// ============================================

async function fetchAirQuality(place = currentPlace) {
  const { latitude, longitude } = place;

  const params = new URLSearchParams({
    latitude,
    longitude,
    timezone: "auto",
    forecast_days: "5",

    hourly: [
      "us_aqi",
      "pm2_5",
      "pm10",
      "nitrogen_dioxide",
      "ozone"
    ].join(",")
  });

  const response = await fetch(`${AIR_API}?${params}`);

  if (!response.ok) {
    throw new Error("Air quality service is temporarily unavailable.");
  }

  return response.json();
}

// ============================================
// LOAD DASHBOARD
// ============================================

async function loadDashboard() {
  citySearchRequestId++;

  const requestId = ++dashboardRequestId;
  const place = { ...currentPlace };

  setStatus("Updating weather intelligence...");
  dashboard.classList.add("hidden");

  weatherData = null;
  airData = null;

  const results = await Promise.allSettled([
    fetchWeather(place),
    fetchAirQuality(place)
  ]);

  if (requestId !== dashboardRequestId) return;

  if (results[0].status === "rejected") {
    console.error(results[0].reason);

    setStatus(
      "Weather could not be loaded. Please try another city or refresh.",
      true
    );

    return;
  }

  weatherData = results[0].value;

  if (results[1].status === "fulfilled") {
    airData = results[1].value;
  } else {
    airData = null;
    console.error(results[1].reason);
  }

  renderDashboard();
  dashboard.classList.remove("hidden");

  if (airData) {
    setStatus("Weather and air quality updated.");
  } else {
    setStatus("Weather updated. Air quality is temporarily unavailable.");
  }
}

// ============================================
// RENDER EVERYTHING
// ============================================

function renderDashboard() {
  if (!weatherData) return;

  renderCurrentWeather();
  renderSunAndUV();
  renderAirQuality();
  renderHourly();
  renderTemperatureChart();
  renderDaily();
  renderDetails();
  renderFavorites();
  updateFavoriteButton();
  updateWeatherEffects();

  // Update the Earth whenever the selected city changes.
  updateEarthLocation();
}

// ============================================
// CURRENT WEATHER
// ============================================

function renderCurrentWeather() {
  const current = weatherData.current;

  const [description, icon] = getWeatherInfo(
    current.weather_code,
    current.is_day === 1
  );

  $("city-name").textContent =
    `${currentPlace.name}, ${currentPlace.country}`;

  $("current-date").textContent = new Date(
    current.time
  ).toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  $("temperature").textContent =
    temperature(current.temperature_2m);

  $("condition").textContent = description;
  $("weather-icon").textContent = icon;

  $("feels-like").textContent =
    `Feels like ${temperature(current.apparent_temperature)}`;

  $("humidity").textContent =
    `${round(current.relative_humidity_2m)}%`;

  $("wind").textContent =
    `${round(current.wind_speed_10m)} km/h`;

  $("precipitation").textContent =
    `${round(current.precipitation)} mm`;
}

// ============================================
// SUNRISE / SUNSET / UV
// ============================================

function renderSunAndUV() {
  const daily = weatherData.daily;

  $("sunrise").textContent = formatTime(daily.sunrise[0]);
  $("sunset").textContent = formatTime(daily.sunset[0]);

  const uv = daily.uv_index_max[0] ?? 0;

  let label = "Low";
  let advice = "Low UV exposure. Normal outdoor activity is fine.";

  if (uv >= 3 && uv < 6) {
    label = "Moderate";
    advice = "Consider sun protection during extended outdoor activity.";
  } else if (uv >= 6 && uv < 8) {
    label = "High";
    advice = "Use sunscreen, sunglasses and protective clothing.";
  } else if (uv >= 8 && uv < 11) {
    label = "Very high";
    advice = "Minimise midday sun exposure and use strong sun protection.";
  } else if (uv >= 11) {
    label = "Extreme";
    advice = "Avoid direct midday sun where possible and use full sun protection.";
  }

  $("uv-value").textContent = round(uv);
  $("uv-label").textContent = label;
  $("uv-advice").textContent = advice;

  $("uv-meter").style.width =
    `${Math.min(uv / 11 * 100, 100)}%`;
}

// ============================================
// AIR QUALITY
// ============================================

function renderAirQuality() {
  const container = $("air-content");

  if (!airData || !airData.hourly) {
    container.innerHTML = `
      <p class="muted">
        Air quality data is temporarily unavailable.
        Please try refreshing the dashboard.
      </p>
    `;
    return;
  }

  const hourly = airData.hourly;

  const index = getClosestIndex(
    hourly.time,
    weatherData.current.time
  );

  const aqi = hourly.us_aqi?.[index];
  const pm25 = hourly.pm2_5?.[index];
  const pm10 = hourly.pm10?.[index];
  const no2 = hourly.nitrogen_dioxide?.[index];
  const ozone = hourly.ozone?.[index];

  const info = getAQIInfo(aqi);

  const displayValue = (value) =>
    value == null ? "--" : Number(value).toFixed(1);

  const aqiValue = aqi == null ? "--" : Math.round(aqi);

  container.innerHTML = `
    <div class="aqi-summary">
      <div class="aqi-number" style="border-color:${info.color};background:${info.color}18">
        <strong style="color:${info.color}">${aqiValue}</strong>
        <span>US AQI</span>
      </div>

      <div class="aqi-description">
        <strong style="color:${info.color}">${info.label}</strong>
        <p>${info.advice}</p>
      </div>
    </div>

    <div class="pollutants">
      <div class="pollutant">
        <span>PM2.5</span>
        <strong>${displayValue(pm25)}</strong>
        <small>µg/m³</small>
      </div>

      <div class="pollutant">
        <span>PM10</span>
        <strong>${displayValue(pm10)}</strong>
        <small>µg/m³</small>
      </div>

      <div class="pollutant">
        <span>NO₂</span>
        <strong>${displayValue(no2)}</strong>
        <small>µg/m³</small>
      </div>

      <div class="pollutant">
        <span>O₃</span>
        <strong>${displayValue(ozone)}</strong>
        <small>µg/m³</small>
      </div>
    </div>
  `;
}

// ============================================
// HOURLY FORECAST
// ============================================

function renderHourly() {
  const hourly = weatherData.hourly;
  const currentTime = weatherData.current.time;

  const start = getClosestIndex(hourly.time, currentTime);
  const container = $("hourly-forecast");

  container.innerHTML = "";

  for (
    let i = start;
    i < Math.min(start + 12, hourly.time.length);
    i++
  ) {
    const [description, icon] = getWeatherInfo(
      hourly.weather_code[i],
      true
    );

    const time = i === start
      ? "Now"
      : formatTime(hourly.time[i]);

    const rain = hourly.precipitation_probability[i];

    const item = document.createElement("div");
    item.className = "hour-item";

    item.innerHTML = `
      <div class="time">${time}</div>
      <div class="icon" title="${description}">${icon}</div>
      <strong>${temperature(hourly.temperature_2m[i])}</strong>
      <span class="rain">${rain ?? 0}% rain</span>
    `;

    container.appendChild(item);
  }
}

// ============================================
// TEMPERATURE GRAPH
// ============================================

function renderTemperatureChart() {
  const hourly = weatherData.hourly;
  const currentTime = weatherData.current.time;

  const start = getClosestIndex(hourly.time, currentTime);
  const values = hourly.temperature_2m.slice(start, start + 24);

  if (values.length < 2) return;

  const width = 700;
  const height = 190;
  const padding = 22;

  const min = Math.min(...values) - 2;
  const max = Math.max(...values) + 2;
  const range = Math.max(max - min, 1);

  const points = values.map((value, index) => {
    const x = padding +
      (index / (values.length - 1)) * (width - padding * 2);

    const y = height - padding -
      ((value - min) / range) * (height - padding * 2);

    return { x, y, value };
  });

  const line = points.map((point, index) =>
    `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
  ).join(" ");

  const area = `${line} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  $("temperature-chart").innerHTML = `
    <defs>
      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#a99aff" stop-opacity=".34"/>
        <stop offset="100%" stop-color="#a99aff" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <path class="chart-area" d="${area}"></path>
    <path class="chart-line" d="${line}"></path>

    ${points.filter((_, i) => i % 3 === 0 || i === points.length - 1).map(point =>
      `<circle class="chart-point" cx="${point.x}" cy="${point.y}" r="4">
        <title>${temperature(point.value)}</title>
      </circle>`
    ).join("")}
  `;

  const labels = [0, 6, 12, 18, 23];

  $("chart-labels").innerHTML = labels.map(index => {
    if (!hourly.time[start + index]) return "";

    return `<span>${formatTime(hourly.time[start + index])}</span>`;
  }).join("");
}

// ============================================
// 7-DAY FORECAST
// ============================================

function renderDaily() {
  const daily = weatherData.daily;
  const container = $("daily-forecast");

  container.innerHTML = "";

  daily.time.forEach((date, index) => {
    const [description, icon] = getWeatherInfo(
      daily.weather_code[index],
      true
    );

    const row = document.createElement("div");
    row.className = "day-row";

    row.innerHTML = `
      <span class="day-name">${formatDay(date, index)}</span>
      <span class="day-icon" title="${description}">${icon}</span>
      <span class="day-condition">${description}</span>
      <span class="day-temps">
        ${temperature(daily.temperature_2m_max[index])}
        <span>${temperature(daily.temperature_2m_min[index])}</span>
      </span>
    `;

    container.appendChild(row);
  });
}

// ============================================
// EXTRA WEATHER DETAILS
// ============================================

function renderDetails() {
  const current = weatherData.current;
  const hourly = weatherData.hourly;

  const index = getClosestIndex(
    hourly.time,
    current.time
  );

  $("detail-feels").textContent =
    temperature(current.apparent_temperature);

  $("detail-humidity").textContent =
    `${round(current.relative_humidity_2m)}%`;

  $("detail-direction").textContent =
    windDirection(current.wind_direction_10m);

  $("detail-rain").textContent =
    `${round(hourly.precipitation_probability[index])}%`;
}

// ============================================
// WEATHER ANIMATIONS
// ============================================

function updateWeatherEffects() {
  const effects = $("weather-effects");
  effects.innerHTML = "";

  if (!weatherData) return;

  const code = weatherData.current.weather_code;

  // Rain effects
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) {
    for (let i = 0; i < 45; i++) {
      const drop = document.createElement("span");
      drop.className = "raindrop";
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${0.6 + Math.random() * 0.8}s`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      effects.appendChild(drop);
    }
  }

  // Snow effects
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    for (let i = 0; i < 35; i++) {
      const snow = document.createElement("span");
      snow.className = "snowflake";
      snow.textContent = "❄";
      snow.style.left = `${Math.random() * 100}%`;
      snow.style.animationDuration = `${5 + Math.random() * 8}s`;
      snow.style.animationDelay = `${Math.random() * 5}s`;
      snow.style.fontSize = `${8 + Math.random() * 10}px`;
      effects.appendChild(snow);
    }
  }
}

// ============================================
// 3D EARTH EXPLORER
// ============================================

function initEarth() {
  const container = $("earth-globe");
  const mode = $("earth-mode");
  if (!container) return;
  if (earthInitialized && earthMap) {
    updateEarthLocation();
    return;
  }
  if (typeof maplibregl === "undefined") {
    if (mode) mode.textContent = "Satellite globe unavailable";
    container.innerHTML = '<p class="earth-loading">Could not load the map library. Check your internet connection.</p>';
    return;
  }

  try {
    earthMap = new maplibregl.Map({
      container,
      projection: { type: "globe" },
      style: {
        version: 8,
        sources: {
          satellite: {
            type: "raster",
            tiles: [
              "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg"
            ],
            tileSize: 256,
            maxzoom: 14,
            attribution: 'Satellite imagery: <a href="https://s2maps.eu" target="_blank" rel="noreferrer">Sentinel-2 cloudless / EOX</a> (2020)'
          }
        },
        layers: [
          { id: "satellite-imagery", type: "raster", source: "satellite",
            paint: { "raster-fade-duration": 250, "raster-saturation": 0.12 } }
        ],
        light: {
          anchor: "map",
          color: "#ffffff",
          intensity: 0.42,
          position: [1.5, 210, 35]
        }
      },
      center: [currentPlace.longitude, currentPlace.latitude],
      zoom: 1.25,
      minZoom: 0.8,
      maxZoom: 14,
      dragRotate: true,
      touchPitch: true,
      attributionControl: true
    });

    earthMap.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
    earthMap.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: "metric" }), "bottom-left");

    earthMap.on("load", () => {
      const markerElement = document.createElement("div");
      markerElement.className = "earth-marker";
      markerElement.setAttribute("aria-label", "Selected weather location");
      earthMarker = new maplibregl.Marker({ element: markerElement, anchor: "center" })
        .setLngLat([currentPlace.longitude, currentPlace.latitude])
        .addTo(earthMap);
      updateEarthLocation();
      if (mode) mode.textContent = "🌍 SATELLITE GLOBE READY";
    });

    earthMap.on("error", (event) => {
      console.warn("Earth map tile or style error:", event.error || event);
      if (mode && !earthMap.loaded()) mode.textContent = "Loading satellite imagery…";
    });

    earthInitialized = true;
  } catch (error) {
    console.error("Could not initialize satellite globe:", error);
    if (mode) mode.textContent = "Globe initialization failed";
  }
}

function updateEarthLocation() {
  const cityElement = $("earth-city");
  const countryElement = $("earth-country");
  const latitudeElement = $("earth-lat");
  const longitudeElement = $("earth-lon");
  const modeElement = $("earth-mode");

  if (cityElement) cityElement.textContent = currentPlace.name;
  if (countryElement) countryElement.textContent = currentPlace.country || "Selected location";
  if (latitudeElement) latitudeElement.textContent = `${Number(currentPlace.latitude).toFixed(4)}°`;
  if (longitudeElement) longitudeElement.textContent = `${Number(currentPlace.longitude).toFixed(4)}°`;

  if (!earthInitialized || !earthMap) {
    initEarth();
    return;
  }

  if (earthMarker) {
    earthMarker.setLngLat([currentPlace.longitude, currentPlace.latitude]);
  }

  // Move the globe's directional light to the Sun's approximate subsolar point.
  // MapLibre shades the globe according to this light direction, creating a real
  // moving day/night terminator rather than merely changing the atmosphere color.
  const now = new Date();
  const dayOfYear = Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) -
    Date.UTC(now.getUTCFullYear(), 0, 0)) / 86400000);
  const fractionalHour = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
  const declination = 23.44 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81));
  const solarLongitude = ((180 - fractionalHour * 15 + 540) % 360) - 180;
  if (typeof earthMap.setLight === "function") {
    earthMap.setLight({
      anchor: "map",
      color: "#ffffff",
      intensity: 0.62,
      position: [1.5, solarLongitude, 90 - declination]
    });
  }

  // Fly to the chosen city while retaining a useful regional zoom level.
  earthMap.flyTo({
    center: [currentPlace.longitude, currentPlace.latitude],
    zoom: 4.2,
    pitch: 18,
    bearing: 0,
    duration: 1800,
    essential: true
  });

  const isDay = weatherData?.current?.is_day === 1;
  if (modeElement) {
    modeElement.textContent = isDay
      ? "☀ SELECTED LOCATION · DAYTIME"
      : "🌙 SELECTED LOCATION · NIGHTTIME";
  }
}

// ============================================
// CITY SEARCH
// ============================================

async function searchCity(city) {
  const query = city.trim();
  if (!query) return;

  const searchRequestId = ++citySearchRequestId;
  setStatus(`Searching for ${query}...`);

  try {
    const params = new URLSearchParams({
      name: query,
      count: "1",
      language: "en",
      format: "json"
    });

    const response = await fetch(`${GEO_API}?${params}`);

    if (!response.ok) {
      throw new Error("City search failed.");
    }

    const data = await response.json();

    if (searchRequestId !== citySearchRequestId) return;

    if (!data.results || data.results.length === 0) {
      throw new Error("City not found. Try another city name.");
    }

    const place = data.results[0];

    currentPlace = {
      name: place.name,
      country: place.country || "",
      latitude: place.latitude,
      longitude: place.longitude
    };

    await loadDashboard();

  } catch (error) {
    if (searchRequestId !== citySearchRequestId) return;

    console.error(error);
    setStatus(error.message || "Could not search for that city.", true);
  }
}

// ============================================
// MY LOCATION
// ============================================

function useMyLocation() {
  if (!navigator.geolocation) {
    setStatus("Location services are not supported by this browser.", true);
    return;
  }

  setStatus("Finding your location...");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      currentPlace = {
        name: "My location",
        country: "",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      await loadDashboard();
    },

    (error) => {
      let message = "Unable to access your location.";

      if (error.code === error.PERMISSION_DENIED) {
        message = "Location permission was denied. You can search for a city instead.";
      }

      setStatus(message, true);
    },

    {
      enableHighAccuracy: false,
      timeout: 10000
    }
  );
}

// ============================================
// FAVOURITE CITIES
// ============================================

function loadFavorites() {
  try {
    return JSON.parse(
      localStorage.getItem("weather-favorites") || "[]"
    );
  } catch {
    return [];
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(
      "weather-favorites",
      JSON.stringify(favorites)
    );
  } catch (error) {
    console.warn("Could not save favourites.", error);
  }
}

function isFavorite() {
  return favorites.some(place =>
    place.name === currentPlace.name &&
    place.country === currentPlace.country
  );
}

function updateFavoriteButton() {
  const saved = isFavorite();

  favoriteButton.innerHTML = saved
    ? "★ <span>Saved</span>"
    : "☆ <span>Save city</span>";
}

function toggleFavorite() {
  if (isFavorite()) {
    favorites = favorites.filter(place =>
      !(place.name === currentPlace.name &&
        place.country === currentPlace.country)
    );
  } else {
    favorites.push({ ...currentPlace });
  }

  saveFavorites();
  renderFavorites();
  updateFavoriteButton();
}

function renderFavorites() {
  const container = $("favorites");

  if (!container) return;

  if (!favorites.length) {
    container.innerHTML =
      '<span class="muted small">Save a city to see it here.</span>';
    return;
  }

  container.innerHTML = "";

  favorites.forEach((place) => {
    const button = document.createElement("button");

    button.className = "favorite-chip";
    button.textContent = `${place.name} ×`;
    button.title = `Open ${place.name}`;

    button.addEventListener("click", () => {
      currentPlace = { ...place };
      loadDashboard();
    });

    container.appendChild(button);
  });
}

// ============================================
// TEMPERATURE UNIT
// ============================================

function toggleUnit() {
  useCelsius = !useCelsius;

  unitToggle.textContent = useCelsius ? "°C" : "°F";

  if (weatherData) {
    renderDashboard();
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

function startWeatherApp() {
  const requiredElements = {
    "search-form": searchForm,
    "city-input": cityInput,
    "location-button": locationButton,
    "refresh-button": refreshButton,
    "unit-toggle": unitToggle,
    "favorite-button": favoriteButton,
    "status": statusBox,
    "dashboard": dashboard,
    "favorites": $("favorites"),
    "weather-effects": $("weather-effects")
  };

  const missingElements = Object.entries(requiredElements)
    .filter(([, element]) => !element)
    .map(([id]) => `#${id}`);

  if (missingElements.length) {
    const message =
      `Weather app setup error. Missing HTML elements: ${missingElements.join(", ")}. Make sure index.html and app.js are from the same version.`;

    console.error(message);

    if (statusBox) {
      statusBox.textContent = message;
      statusBox.classList.add("error");
    }

    return;
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchCity(cityInput.value);
  });

  locationButton.addEventListener("click", useMyLocation);
  refreshButton.addEventListener("click", loadDashboard);
  unitToggle.addEventListener("click", toggleUnit);
  favoriteButton.addEventListener("click", toggleFavorite);

  renderFavorites();

  // Initialize the globe once the page elements exist.
  initEarth();

  loadDashboard();
}

// ============================================
// START THE APP
// ============================================

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    startWeatherApp,
    { once: true }
  );
} else {
  startWeatherApp();
}

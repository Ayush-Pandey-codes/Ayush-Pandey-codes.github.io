
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const state = {
    latitude: 60.1699,
    longitude: 24.9384,
    city: "Helsinki",
    country: "Finland",
    unit: "c",
    weather: null
  };

  const weatherTypes = {
    0: ["Clear sky", "☀"],
    1: ["Mainly clear", "🌤"],
    2: ["Partly cloudy", "⛅"],
    3: ["Overcast", "☁"],
    45: ["Fog", "🌫"],
    48: ["Depositing rime fog", "🌫"],
    51: ["Light drizzle", "🌦"],
    53: ["Drizzle", "🌦"],
    55: ["Dense drizzle", "🌧"],
    56: ["Freezing drizzle", "🌧"],
    57: ["Heavy freezing drizzle", "🌧"],
    61: ["Slight rain", "🌦"],
    63: ["Moderate rain", "🌧"],
    65: ["Heavy rain", "🌧"],
    66: ["Freezing rain", "🌧"],
    67: ["Heavy freezing rain", "🌧"],
    71: ["Slight snow", "🌨"],
    73: ["Moderate snow", "🌨"],
    75: ["Heavy snow", "❄"],
    77: ["Snow grains", "❄"],
    80: ["Rain showers", "🌦"],
    81: ["Moderate showers", "🌧"],
    82: ["Violent showers", "⛈"],
    85: ["Snow showers", "🌨"],
    86: ["Heavy snow showers", "❄"],
    95: ["Thunderstorm", "⛈"],
    96: ["Thunderstorm with hail", "⛈"],
    99: ["Heavy thunderstorm", "⛈"]
  };

  const condition = (code) =>
    weatherTypes[code] || ["Variable conditions", "☁"];

  const round = (value) => Math.round(value);

  const temperature = (value) => `${round(value)}°`;

  const timeLabel = (iso) =>
    new Date(iso).toLocaleTimeString([], {
      hour: "numeric"
    });

  const dateLabel = (iso, options = {}) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString([], options);

  const setStatus = (message, isError = false) => {
    $("statusText").textContent = message;
    $("statusLine").classList.toggle("error", isError);
  };

  // Search for a city using the Open-Meteo geocoding API.
  async function geocode(query) {
    const url = new URL(
      "https://geocoding-api.open-meteo.com/v1/search"
    );

    url.search = new URLSearchParams({
      name: query,
      count: "1",
      language: "en",
      format: "json"
    });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Location search is temporarily unavailable."
      );
    }

    const data = await response.json();

    if (!data.results || !data.results.length) {
      throw new Error(
        "No matching place found. Try another city name."
      );
    }

    const place = data.results[0];

    return {
      latitude: place.latitude,
      longitude: place.longitude,
      city: place.name,
      country: place.country || place.admin1 || "Selected location"
    };
  }

  // Get current conditions and forecast data.
  async function fetchWeather() {
    setStatus(`Finding current conditions for ${state.city}...`);

    $("weatherContent").setAttribute("aria-busy", "true");

    const params = new URLSearchParams({
      latitude: state.latitude,
      longitude: state.longitude,

      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",

      hourly:
        "temperature_2m,precipitation_probability,weather_code",

      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max",

      forecast_days: "7",
      timezone: "auto",

      temperature_unit:
        state.unit === "c" ? "celsius" : "fahrenheit",

      wind_speed_unit:
        state.unit === "c" ? "kmh" : "mph"
    });

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params}`
      );

      if (!response.ok) {
        throw new Error(
          "Weather service returned an error. Please try again."
        );
      }

      state.weather = await response.json();

      render();

      setStatus(`Weather updated for ${state.city}.`);

    } catch (error) {
      setStatus(
        error.message ||
        "Could not load weather. Check your connection and try again.",
        true
      );

    } finally {
      $("weatherContent").setAttribute("aria-busy", "false");
    }
  }

  // Display current weather.
  function renderCurrent(data) {
    const current = data.current;
    const daily = data.daily;

    const [description, icon] = condition(
      current.weather_code
    );

    $("placeName").textContent = state.city;
    $("placeDetail").textContent = state.country;

    $("currentIcon").textContent = icon;

    $("currentTemp").textContent = temperature(
      current.temperature_2m
    );

    $("currentDescription").textContent = description;

    $("feelsLike").textContent =
      `Feels like ${temperature(current.apparent_temperature)}`;

    $("windValue").textContent =
      `${round(current.wind_speed_10m)} ${
        state.unit === "c" ? "km/h" : "mph"
      }`;

    $("humidityValue").textContent =
      `${current.relative_humidity_2m}%`;

    $("uvValue").textContent =
      daily.uv_index_max?.[0] ?? "—";

    $("sunrise").textContent =
      daily.sunrise?.[0]
        ? timeLabel(daily.sunrise[0])
        : "—";

    $("sunset").textContent =
      daily.sunset?.[0]
        ? timeLabel(daily.sunset[0])
        : "—";
  }

  // Display the next 12 hours.
  function renderHourly(data) {
    const times = data.hourly.time;

    const now = new Date(data.current.time).getTime();

    let start = times.findIndex(
      (time) => new Date(time).getTime() >= now
    );

    if (start < 0) start = 0;

    const items = times.slice(start, start + 12);

    $("hourlyList").innerHTML = items.map((time, offset) => {
      const index = start + offset;

      const [label, icon] = condition(
        data.hourly.weather_code[index]
      );

      const rain =
        data.hourly.precipitation_probability[index];

      const heading =
        offset === 0 ? "Now" : timeLabel(time);

      return `
        <div class="hour-item" title="${label}">
          <div class="hour-time">${heading}</div>
          <div class="hour-icon" aria-hidden="true">${icon}</div>
          <div class="hour-temp">
            ${temperature(data.hourly.temperature_2m[index])}
          </div>
          <div class="hour-rain">☂ ${rain ?? 0}%</div>
        </div>
      `;
    }).join("");
  }

  // Display the seven-day forecast.
  function renderWeek(data) {
    const daily = data.daily;

    const lows = daily.temperature_2m_min;
    const highs = daily.temperature_2m_max;

    const minAll = Math.min(...lows);
    const maxAll = Math.max(...highs);

    const span = Math.max(1, maxAll - minAll);

    $("weekList").innerHTML = daily.time.map((date, index) => {
      const [label, icon] = condition(
        daily.weather_code[index]
      );

      const left =
        ((lows[index] - minAll) / span) * 100;

      const width = Math.max(
        5,
        ((highs[index] - lows[index]) / span) * 100
      );

      const day =
        index === 0
          ? "Today"
          : dateLabel(date, { weekday: "short" });

      return `
        <div class="day-row">

          <div class="day-name">${day}</div>

          <div class="day-condition">
            <span aria-hidden="true">${icon}</span>
            ${label}
          </div>

          <div class="day-range">
            <span>${temperature(lows[index])}</span>

            <div class="range-track" aria-label="Temperature range">
              <div
                class="range-fill"
                style="margin-left:${left}%;width:${width}%"
              ></div>
            </div>

            <strong>${temperature(highs[index])}</strong>
          </div>

          <div class="rain-chance">
            ☂ ${daily.precipitation_probability_max?.[index] ?? 0}%
          </div>

        </div>
      `;
    }).join("");

    $("updatedAt").textContent =
      `7 DAYS · ${data.timezone_abbreviation || data.timezone}`;
  }

  function render() {
    if (!state.weather) return;

    renderCurrent(state.weather);
    renderHourly(state.weather);
    renderWeek(state.weather);
  }

  // City search.
  $("searchForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = $("cityInput").value.trim();

    if (!query) return;

    setStatus(`Searching for ${query}...`);

    try {
      Object.assign(state, await geocode(query));

      await fetchWeather();

    } catch (error) {
      setStatus(error.message, true);
    }
  });

  // Celsius / Fahrenheit switching.
  document.querySelectorAll("[data-unit]").forEach((button) => {

    button.addEventListener("click", () => {

      if (state.unit === button.dataset.unit) return;

      state.unit = button.dataset.unit;

      document.querySelectorAll("[data-unit]").forEach((item) => {

        const active = item === button;

        item.classList.toggle("active", active);

        item.setAttribute(
          "aria-pressed",
          String(active)
        );

      });

      fetchWeather();
    });

  });

  // Use the visitor's location.
  $("locationButton").addEventListener("click", () => {

    if (!("geolocation" in navigator)) {
      setStatus(
        "Location is not supported by this browser. Search for a city instead.",
        true
      );
      return;
    }

    setStatus("Requesting your location...");

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        state.latitude = position.coords.latitude;
        state.longitude = position.coords.longitude;

        state.city = "Your location";

        state.country =
          `${state.latitude.toFixed(2)}°, ${state.longitude.toFixed(2)}°`;

        await fetchWeather();

      },

      (error) => {

        const message =
          error.code === 1
            ? "Location permission was denied. Search for a city instead."
            : "Couldn't get your location. Search for a city instead.";

        setStatus(message, true);

      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      }

    );

  });

  // Refresh button.
  $("refreshButton").addEventListener(
    "click",
    fetchWeather
  );

  // Load Helsinki weather when the page opens.
  fetchWeather();

})();

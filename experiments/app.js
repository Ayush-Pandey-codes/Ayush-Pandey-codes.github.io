"use strict";

/* Weather Intelligence · Aurora Edition
   Weather API: Open-Meteo
   Globe: MapLibre GL JS
*/

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
  favorites: readFavorites(),
  map: null,
  marker: null,
  mapReady: false,
  requestId: 0
};

function readFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem("weatherFavorites") || "[]");
    return Array.isArray(value) ? value.filter((item) =>
      item && typeof item.name === "string" &&
      Number.isFinite(Number(item.latitude)) && Number.isFinite(Number(item.longitude))
    ) : [];
  } catch { return []; }
}

function weatherInfo(code, isDay = true) {
  const table = {
    0:["Clear sky",isDay?"☀️":"🌙"],1:["Mainly clear",isDay?"🌤️":"🌙"],
    2:["Partly cloudy","⛅"],3:["Overcast","☁️"],45:["Fog","🌫️"],48:["Rime fog","🌫️"],
    51:["Light drizzle","🌦️"],53:["Drizzle","🌦️"],55:["Dense drizzle","🌧️"],
    56:["Freezing drizzle","🌧️"],57:["Heavy freezing drizzle","🌧️"],
    61:["Slight rain","🌦️"],63:["Moderate rain","🌧️"],65:["Heavy rain","🌧️"],
    66:["Freezing rain","🌧️"],67:["Heavy freezing rain","🌧️"],
    71:["Light snow","🌨️"],73:["Snowfall","❄️"],75:["Heavy snow","❄️"],77:["Snow grains","🌨️"],
    80:["Rain showers","🌦️"],81:["Moderate showers","🌧️"],82:["Heavy showers","⛈️"],
    85:["Snow showers","🌨️"],86:["Heavy snow showers","❄️"],
    95:["Thunderstorm","⛈️"],96:["Thunderstorm with hail","⛈️"],99:["Severe thunderstorm","⛈️"]
  };
  return table[Number(code)] || ["Conditions unavailable","🌡️"];
}

function safeNumber(value, digits = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n.toFixed(digits) : "--";
}
function temperature(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "--°";
  return `${Math.round(state.unit === "fahrenheit" ? n * 9 / 5 + 32 : n)}°`;
}
function windSpeed(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "--";
  return state.unit === "fahrenheit" ? `${Math.round(n * 0.621371)} mph` : `${Math.round(n)} km/h`;
}
function formatDate(dateString, options = {}) {
  if (!dateString) return "—";
  const date = new Date(`${dateString}T12:00:00`);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString(undefined, {
    weekday:"long", day:"numeric", month:"long", ...options
  });
}
function formatTime(value) {
  if (!value) return "--:--";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "--:--" : date.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
}
function setText(id, value) {
  const node = $(id);
  if (node) node.textContent = value;
}
function setStatus(message, type = "") {
  const node = $("status");
  if (!node) return;
  node.textContent = message;
  node.className = `status-message${type ? ` ${type}` : ""}`;
}
async function fetchJSON(url, options = {}) {
  const response = await fetch(url, { ...options, headers: {Accept:"application/json", ...(options.headers || {})} });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

async function searchCity(query) {
  const params = new URLSearchParams({name:query,count:"5",language:"en",format:"json"});
  const data = await fetchJSON(`${API.geocoding}?${params}`);
  if (!data.results?.length) throw new Error("No matching place found. Try a different city name.");
  // Prefer the first geocoding result; Open-Meteo ranks the matches by relevance.
  return normalizeCity(data.results[0]);
}
function normalizeCity(raw) {
  return {
    name: raw.name || "Selected location",
    country: raw.country || raw.country_code || "",
    latitude: Number(raw.latitude),
    longitude: Number(raw.longitude)
  };
}
async function loadCity(query) {
  if (!query?.trim()) { setStatus("Enter a city or place to search.", "error"); return; }
  setStatus(`Finding ${query.trim()}…`);
  try {
    const city = await searchCity(query.trim());
    await loadWeather(city);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Could not find that place.", "error");
  }
}

async function loadWeather(city) {
  const requestId = ++state.requestId;
  setStatus(`Loading weather for ${city.name}…`);
  const params = new URLSearchParams({
    latitude:city.latitude, longitude:city.longitude, timezone:"auto", forecast_days:"7",
    current:"temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m",
    hourly:"temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m,is_day",
    daily:"weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max"
  });
  try {
    const weather = await fetchJSON(`${API.forecast}?${params}`);
    if (requestId !== state.requestId) return;
    if (!weather.current || !weather.hourly || !weather.daily) throw new Error("Weather response was incomplete.");
    state.city = city;
    state.weather = weather;
    renderDashboard();
    updateEarthLocation(city);
    loadAirQuality(city, requestId).catch((error) => {
      if (requestId !== state.requestId) return;
      console.warn("Air quality unavailable:", error);
      state.air = null;
      renderAirQuality(null);
    });
    setStatus(`Weather updated for ${city.name}.`, "success");
  } catch (error) {
    if (requestId !== state.requestId) return;
    console.error(error);
    setStatus(error.message || "Unable to load weather. Please try again.", "error");
  }
}

function applyAdaptiveTheme(isDay) {
  document.body.dataset.theme = isDay ? "day" : "night";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = isDay ? "#e9f3f0" : "#091321";
}
function renderDashboard() {
  if (!state.city || !state.weather) return;
  const {current,daily} = state.weather;
  $("dashboard")?.removeAttribute("hidden");
  setText("city-name", state.city.name);
  setText("current-date", formatDate(current.time?.slice(0,10)));
  setText("temperature", temperature(current.temperature_2m));
  const info = weatherInfo(current.weather_code, current.is_day === 1);
  setText("condition", info[0]);
  setText("feels-like", `Feels like ${temperature(current.apparent_temperature)}`);
  setText("weather-icon", info[1]);
  setText("humidity", `${safeNumber(current.relative_humidity_2m)}%`);
  setText("wind", windSpeed(current.wind_speed_10m));
  setText("precipitation", `${safeNumber(current.precipitation,1)} mm`);
  setText("sunrise", formatTime(daily.sunrise?.[0]));
  setText("sunset", formatTime(daily.sunset?.[0]));
  applyAdaptiveTheme(current.is_day === 1);
  renderUV(daily.uv_index_max?.[0]);
  renderHourly();
  renderDaily();
  renderDetails();
  renderChart();
  renderFavorites();
  updateFavoriteButton();
}

function renderUV(value) {
  const uv = Number(value);
  if (!Number.isFinite(uv)) {
    setText("uv-value","--"); setText("uv-label","Unavailable");
    setText("uv-advice","UV information is currently unavailable.");
    if ($("uv-meter")) $("uv-meter").style.width = "0%";
    return;
  }
  let label = "Low", advice = "Enjoy the outdoors; normal sun protection is sensible.";
  if (uv >= 3 && uv < 6) { label="Moderate"; advice="Consider sunscreen, sunglasses and shade around midday."; }
  else if (uv >= 6 && uv < 8) { label="High"; advice="Use sunscreen and protective clothing."; }
  else if (uv >= 8 && uv < 11) { label="Very high"; advice="Reduce direct sun exposure and seek shade."; }
  else if (uv >= 11) { label="Extreme"; advice="Avoid direct sunlight during peak UV hours."; }
  setText("uv-value",safeNumber(uv,1)); setText("uv-label",label); setText("uv-advice",advice);
  if ($("uv-meter")) $("uv-meter").style.width = `${Math.min(100,uv/11*100)}%`;
}

function currentHourIndex() {
  const times = state.weather?.hourly?.time || [];
  const currentTime = new Date(state.weather.current.time).getTime();
  const index = times.findIndex((time) => new Date(time).getTime() >= currentTime);
  return index < 0 ? 0 : index;
}
function renderHourly() {
  const container = $("hourly-forecast");
  if (!container || !state.weather) return;
  const hourly = state.weather.hourly, start = currentHourIndex();
  container.innerHTML = hourly.time.slice(start,start+8).map((time,offset) => {
    const i = start + offset;
    const info = weatherInfo(hourly.weather_code[i],hourly.is_day?.[i] === 1);
    const label = offset === 0 ? "Now" : formatTime(time);
    return `<div class="hour-card">
      <span class="hour-time">${label}</span><span class="hour-icon" aria-hidden="true">${info[1]}</span>
      <strong class="hour-temp">${temperature(hourly.temperature_2m[i])}</strong>
      <span class="hour-rain">${safeNumber(hourly.precipitation_probability?.[i])}% rain</span>
    </div>`;
  }).join("");
}
function renderDaily() {
  const container = $("daily-forecast");
  if (!container || !state.weather) return;
  const daily = state.weather.daily;
  container.innerHTML = daily.time.map((date,i) => {
    const info = weatherInfo(daily.weather_code[i],true);
    const day = i === 0 ? "Today" : new Date(`${date}T12:00:00`).toLocaleDateString(undefined,{weekday:"short"});
    return `<div class="day-row">
      <span class="day-name">${day}</span><span class="day-icon" aria-label="${info[0]}">${info[1]}</span>
      <div class="day-temperatures"><span>${temperature(daily.temperature_2m_max[i])}</span><span class="day-low">${temperature(daily.temperature_2m_min[i])}</span></div>
      <span class="day-rain">${safeNumber(daily.precipitation_probability_max?.[i])}% rain</span>
    </div>`;
  }).join("");
}
function windDirection(degrees) {
  const d = Number(degrees);
  if (!Number.isFinite(d)) return "--";
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return `${dirs[Math.round(d/45)%8]} · ${Math.round(d)}°`;
}
function renderDetails() {
  const c = state.weather.current;
  setText("detail-feels",temperature(c.apparent_temperature));
  setText("detail-humidity",`${safeNumber(c.relative_humidity_2m)}%`);
  setText("detail-direction",windDirection(c.wind_direction_10m));
  setText("detail-rain",`${safeNumber(c.precipitation,1)} mm`);
}
function renderChart() {
  const svg = $("temperature-chart"), labels = $("chart-labels");
  if (!svg || !state.weather) return;
  const hourly = state.weather.hourly, start = currentHourIndex();
  const values = hourly.temperature_2m.slice(start,start+12).map(Number).filter(Number.isFinite);
  if (values.length < 2) { svg.innerHTML=""; if(labels) labels.textContent=""; return; }
  const min = Math.min(...values)-2, max = Math.max(...values)+2, range = max-min || 1;
  const w=700,h=190,px=22,py=22;
  const points=values.map((value,i)=>({x:px+i/(values.length-1)*(w-px*2),y:h-py-(value-min)/range*(h-py*2)}));
  const line=points.map((p,i)=>`${i?"L":"M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const area=`${line} L ${points.at(-1).x} ${h} L ${points[0].x} ${h} Z`;
  svg.innerHTML=`<defs><linearGradient id="aurora-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#73d9c0" stop-opacity=".3"/><stop offset="100%" stop-color="#73d9c0" stop-opacity="0"/></linearGradient></defs>
    <path d="${area}" fill="url(#aurora-fill)"/><path d="${line}" fill="none" stroke="var(--mint)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    ${points.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--mint)" stroke="var(--bg-soft)" stroke-width="2"/>`).join("")}`;
  if (labels) labels.innerHTML=points.map((_,i)=>`<span>${formatTime(hourly.time[start+i])}</span>`).join("");
}

async function loadAirQuality(city, requestId) {
  const params = new URLSearchParams({
    latitude:city.latitude,longitude:city.longitude,timezone:"auto",
    current:"european_aqi,us_aqi,pm10,pm2_5"
  });
  const data=await fetchJSON(`${API.airQuality}?${params}`);
  if (requestId !== state.requestId) return;
  state.air=data;
  renderAirQuality(data);
}
function renderAirQuality(data) {
  const container=$("air-content");
  if (!container) return;
  const c=data?.current;
  if (!c) {
    container.innerHTML='<span class="air-score">--</span><div><strong>Unavailable</strong><p class="muted small">Air quality data could not be retrieved right now.</p></div>';
    setText("pm25","-- μg/m³"); setText("pm10","-- μg/m³"); return;
  }
  const aqi=Number(c.european_aqi ?? c.us_aqi);
  let label="Good", note="Air quality is satisfactory.";
  if (!Number.isFinite(aqi)) label="Unavailable";
  else if (aqi>20 && aqi<=40) {label="Fair";note="Air quality is acceptable for most people.";}
  else if (aqi>40 && aqi<=60) {label="Moderate";note="Sensitive people may notice effects.";}
  else if (aqi>60 && aqi<=80) {label="Poor";note="Consider reducing prolonged outdoor activity.";}
  else if (aqi>80 && aqi<=100) {label="Very poor";note="Limit outdoor activity if you are sensitive.";}
  else if (aqi>100) {label="Extremely poor";note="Avoid prolonged outdoor activity.";}
  container.innerHTML=`<span class="air-score">${safeNumber(aqi)}</span><div><strong>${label}</strong><p class="muted small">${note}</p></div>`;
  setText("pm25",`${safeNumber(c.pm2_5,1)} μg/m³`);
  setText("pm10",`${safeNumber(c.pm10,1)} μg/m³`);
}

function isFavorite(city) {
  if (!city) return false;
  return state.favorites.some(item => item.name.toLowerCase()===city.name.toLowerCase() &&
    Math.abs(Number(item.latitude)-city.latitude)<.01 && Math.abs(Number(item.longitude)-city.longitude)<.01);
}
function persistFavorites() {
  try { localStorage.setItem("weatherFavorites",JSON.stringify(state.favorites)); }
  catch (error) { console.warn("Could not save favorite places:",error); }
}
function toggleFavorite() {
  if (!state.city) return;
  if (isFavorite(state.city)) {
    state.favorites=state.favorites.filter(item => !(item.name.toLowerCase()===state.city.name.toLowerCase() &&
      Math.abs(Number(item.latitude)-state.city.latitude)<.01 && Math.abs(Number(item.longitude)-state.city.longitude)<.01));
  } else {
    state.favorites.push({...state.city});
  }
  persistFavorites(); renderFavorites(); updateFavoriteButton();
}
function renderFavorites() {
  const container=$("favorites");
  if (!container) return;
  if (!state.favorites.length) {
    container.innerHTML='<span class="muted tiny">Save a place to keep it close.</span>';
    return;
  }
  container.innerHTML=state.favorites.map((city,i)=>
    `<button class="favorite-chip" type="button" data-favorite="${i}">${escapeHTML(city.name)}</button>`
  ).join("");
  container.querySelectorAll("[data-favorite]").forEach(button => button.addEventListener("click",()=>{
    const city=state.favorites[Number(button.dataset.favorite)];
    if (city) loadWeather(city);
  }));
}
function updateFavoriteButton() {
  const button=$("favorite-button");
  if (!button) return;
  const saved=isFavorite(state.city);
  button.innerHTML=`<span>${saved?"★":"☆"}</span><b>${saved?"Saved":"Save place"}</b>`;
  button.setAttribute("aria-label",saved?"Remove this saved place":"Save this city");
  button.title=saved?"Remove this saved place":"Save this city";
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch]));
}

function toggleUnits() {
  state.unit=state.unit==="celsius"?"fahrenheit":"celsius";
  setText("unit-toggle",state.unit==="celsius"?"°C":"°F");
  if (state.weather) renderDashboard();
}

function useCurrentLocation() {
  if (!navigator.geolocation) { setStatus("Location services are not supported by this browser.","error"); return; }
  setStatus("Requesting your location…");
  navigator.geolocation.getCurrentPosition(async position=>{
    const city={name:"My location",country:"",latitude:position.coords.latitude,longitude:position.coords.longitude};
    try {
      const params=new URLSearchParams({latitude:city.latitude,longitude:city.longitude,count:"1",language:"en",format:"json"});
      const data=await fetchJSON(`${API.geocoding}?${params}`);
      if (data.results?.[0]) { city.name=data.results[0].name;city.country=data.results[0].country||""; }
      await loadWeather(city);
    } catch(error) { console.error(error);setStatus("Could not load weather for your location.","error"); }
  },error=>{
    console.warn(error);
    setStatus(error.code===error.PERMISSION_DENIED?"Location permission was denied. Search for a city instead.":"Could not determine your location.","error");
  },{enableHighAccuracy:true,timeout:12000,maximumAge:300000});
}

/* MapLibre globe.
   The previous implementation called map.setFog(), which is not available
   in every MapLibre build. The globe atmosphere is now a CSS treatment;
   no unsupported atmosphere method is called. */
function initEarth() {
  const container=$("earth-globe");
  if (!container) return;
  if (!window.maplibregl?.Map) {
    container.innerHTML='<div class="globe-fallback">The globe library did not load. Check your connection and reload.</div>';
    console.error("MapLibre GL JS did not load.");
    return;
  }
  try {
    container.innerHTML="";
    state.map=new maplibregl.Map({
      container,
      style:{
        version:8,
        sources:{
          satellite:{
            type:"raster",
            tiles:["https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg"],
            tileSize:256,
            attribution:"Satellite imagery © EOX"
          }
        },
        layers:[{
          id:"satellite-layer",type:"raster",source:"satellite",
          minzoom:0,maxzoom:18
        }],
        projection:{type:"globe"}
      },
      center:[24.9384,60.1699],zoom:1.45,minZoom:1,maxZoom:8,
      attributionControl:true,dragRotate:true,touchZoomRotate:true
    });
    state.map.addControl(new maplibregl.NavigationControl({showCompass:true,showZoom:true}),"top-right");
    state.map.on("style.load",()=>{
      // MapLibre uses setSky() for globe atmosphere. setFog() is a Mapbox API
      // and is not available on MapLibre GL JS.
      try {
        state.map.setProjection({type:"globe"});
        state.map.setSky({
          "atmosphere-blend":["interpolate",["linear"],["zoom"],0,1,5,1,7,0]
        });
      } catch (error) {
        console.warn("Globe atmosphere could not be enabled:",error);
      }
    });
    state.map.on("load",()=>{
      state.mapReady=true;
      if (state.city) updateEarthLocation(state.city);
      // Recalculate dimensions once the initially hidden dashboard is visible.
      requestAnimationFrame(()=>state.map?.resize());
    });
    state.map.on("error",event=>console.warn("MapLibre map error:",event.error||event));
  } catch(error) {
    console.error("Could not initialize Earth globe:",error);
    container.innerHTML='<div class="globe-fallback">Unable to initialize the Earth explorer.</div>';
  }
}
function updateEarthLocation(city) {
  if (!city) return;
  setText("earth-city",city.name);
  setText("earth-country",city.country||"Location selected");
  setText("earth-lat",`${safeNumber(city.latitude,3)}°`);
  setText("earth-lon",`${safeNumber(city.longitude,3)}°`);
  if (!state.map || !state.mapReady) return;
  const coordinates=[city.longitude,city.latitude];
  if (!state.marker) {
    state.marker=new maplibregl.Marker({color:"#8ce8c8"})
      .setLngLat(coordinates).setPopup(new maplibregl.Popup({offset:24}).setText(city.name)).addTo(state.map);
  } else {
    state.marker.setLngLat(coordinates);
    state.marker.getPopup()?.setText(city.name);
  }
  state.map.flyTo({center:coordinates,zoom:3,speed:.75,curve:1.35,essential:true});
}
function focusEarth() {
  if (state.city && state.map && state.mapReady) {
    state.map.flyTo({center:[state.city.longitude,state.city.latitude],zoom:3.2,speed:.8,curve:1.3,essential:true});
  }
}

async function refreshWeather() {
  if (!state.city) { setStatus("Search for a place first.","error"); return; }
  await loadWeather(state.city);
}
function setupEventListeners() {
  $("search-form")?.addEventListener("submit",event=>{
    event.preventDefault();
    const input=$("city-input");
    loadCity(input?.value||"");
  });
  $("location-button")?.addEventListener("click",useCurrentLocation);
  $("refresh-button")?.addEventListener("click",refreshWeather);
  $("unit-toggle")?.addEventListener("click",toggleUnits);
  $("favorite-button")?.addEventListener("click",toggleFavorite);
  $("earth-focus")?.addEventListener("click",focusEarth);
}
async function startWeatherApp() {
  setupEventListeners();
  renderFavorites();
  initEarth();
  const initial={name:"Helsinki",country:"Finland",latitude:60.1699,longitude:24.9384};
  await loadWeather(initial);
}
document.addEventListener("DOMContentLoaded",startWeatherApp);

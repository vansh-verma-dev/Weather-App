// ---------- Elements ----------
const cityEl = document.getElementById("city");
const dateEl = document.getElementById("date");
const tempEl = document.getElementById("temp");
const condEl = document.getElementById("condition");

const humEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressEl = document.getElementById("pressure");
const feelsEl = document.getElementById("feels");
const visEl = document.getElementById("visibility");
const cloudEl = document.getElementById("cloud");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");

const tableBody = document.getElementById("cityTable");

// ---------- Helpers ----------
function formatTime(iso){
  const d = new Date(iso);
  return d.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
}

function formatDate(){
  const d = new Date();
  dateEl.textContent = d.toLocaleString(undefined,{weekday:'long', hour:'numeric', minute:'2-digit'});
}

// ---------- Step 1: Get Coordinates (works for village also) ----------
async function getCoordinates(place){
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=1`);
  const data = await res.json();

  if(!data.results) throw new Error("Location not found");

  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
    name: data.results[0].name
  };
}

// ---------- Step 2: Get Weather ----------
async function getWeather(cityName){

  try{
    const loc = await getCoordinates(cityName);

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,cloud_cover,visibility,wind_speed_10m&daily=sunrise,sunset&timezone=auto`
    );

    const data = await res.json();
    const w = data.current;

    // HERO
    cityEl.textContent = loc.name;
    tempEl.textContent = Math.round(w.temperature_2m) + "°";
    condEl.textContent = "Live Weather";
    formatDate();

    // DETAILS
    humEl.textContent = w.relative_humidity_2m + "%";
    windEl.textContent = w.wind_speed_10m + " km/h";
    pressEl.textContent = w.pressure_msl + " hPa";
    feelsEl.textContent = Math.round(w.apparent_temperature) + "°";
    visEl.textContent = w.visibility + " m";
    cloudEl.textContent = w.cloud_cover + "%";

    sunriseEl.textContent = formatTime(data.daily.sunrise[0]);
    sunsetEl.textContent = formatTime(data.daily.sunset[0]);

  }catch{
    alert("City / Village not found");
  }
}

// ---------- Search ----------
document.getElementById("searchBtn").onclick = ()=>{
  getWeather(document.getElementById("cityInput").value);
};

document.getElementById("cityInput").addEventListener("keypress",e=>{
  if(e.key==="Enter") getWeather(e.target.value);
});

// ---------- Popular Cities Table ----------
const cities = ["Delhi","Mumbai","Kolkata","Chennai","London","New York","Tokyo","Dubai","Paris","Singapore"];

async function loadCities(){

  tableBody.innerHTML = "";

  for(const city of cities){

    try{
      const loc = await getCoordinates(city);

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,cloud_cover,visibility,wind_speed_10m&daily=sunrise,sunset&timezone=auto`
      );

      const d = await res.json();
      const w = d.current;

      tableBody.innerHTML += `
      <tr>
        <td>${city}</td>
        <td>${Math.round(w.temperature_2m)}°</td>
        <td>${Math.round(w.apparent_temperature)}°</td>
        <td>${w.relative_humidity_2m}%</td>
        <td>${w.wind_speed_10m}</td>
        <td>${w.pressure_msl}</td>
        <td>${w.visibility}</td>
        <td>${w.cloud_cover}%</td>
        <td>${formatTime(d.daily.sunrise[0])}</td>
        <td>${formatTime(d.daily.sunset[0])}</td>
      </tr>`;
    }
    catch{
      tableBody.innerHTML += `<tr><td>${city}</td><td colspan="9">Error</td></tr>`;
    }
  }
}

// ---------- Default Load ----------
getWeather("Delhi");
loadCities();

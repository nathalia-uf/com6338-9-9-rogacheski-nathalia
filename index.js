const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "e89fac7ae6e0f6ceaf56d0c8424f5ecc";
const weatherDiv = document.getElementById('weather-app');
const form = document.querySelector('form');

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchTerm = event.target.search.value;
    if (!searchTerm) return;
  
    try {
      const response = await fetch(
        `${URL}${searchTerm}&units=imperial&appid=${API_KEY}`
      );
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        weatherDiv.innerHTML = "";
        const h2 = document.createElement('h2');
        h2.textContent = searchTerm.toUpperCase();
        weatherDiv.appendChild(h2);

        const mapLink = document.createElement('a');
        mapLink.href = `https://www.google.com/maps/search/?api=1&query=${data.coord.lat},${data.coord.lon}`;
        mapLink.target = "_blank";
        mapLink.textContent = `View on Map`;
        weatherDiv.appendChild(mapLink);

        const iconCode = data.weather[0].icon;
        const description = data.weather[0].description;

        const icon = document.createElement('img');
        icon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
        icon.alt = description;
        weatherDiv.appendChild(icon);

        const condition = document.createElement('p');
        condition.textContent = description;
        weatherDiv.appendChild(condition);

        const currentTemp = data.main.temp;
        const temp = document.createElement('p');
        temp.textContent = `Current: ${Math.round(currentTemp)}°F`;
        weatherDiv.appendChild(temp);

        const feelsLikeTemp = data.main.feels_like;
        const feelsLike = document.createElement('p');
        feelsLike.textContent = `Feels like: ${Math.round(feelsLikeTemp)}°F`;
        weatherDiv.appendChild(feelsLike);

        const dt = data.dt;
        const updated = document.createElement('p');
        updated.textContent = `Last updated: ${new Date(dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }).toLowerCase()}`;
        weatherDiv.appendChild(updated);
    }else {
        weatherDiv.innerHTML = "<p>Location not found</p>";
      }
    } catch (error) {
      console.error(error);
      weatherDiv.innerHTML = "<p>Something went wrong</p>";
    }
  });

  function getLocalTime(sec) {
    return new Date(sec * 1000)
      .toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })
      .toLowerCase();
  }
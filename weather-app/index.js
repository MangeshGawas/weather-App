const apikey = "9dc101e0d3f9a7c6d85c3dd8d5a3c9ce";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

const getWeatherData = async (cityValue) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    console.log(temperature, "here is the icon");
    const details = [
      `feel Like: ${Math.round(data.main.feels_like)}`,
      `Humadity: ${data.main.humidity}%`,
      `Wind Speed:${data.wind.speed} m/s`,
    ];
    // console.log(data)
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weatherIcon">`;

    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;

    weatherDataEl.querySelector(".description").textContent = `${description}`;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";

    weatherDataEl.querySelector(".temperature").textContent = "";

    weatherDataEl.querySelector(".description").textContent = "Error Occur";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
};

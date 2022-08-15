const search = document.getElementById("search") as HTMLInputElement;

let weatherData: {
  weather: [
    {
      main: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  name: string;
};

const createWeatherPage = (data: object) => {
  data = weatherData;
  const cityName = document.getElementById("cityName")!;
  const weather = document.getElementById("weather")!;
  const temperature = document.getElementById("temperature")!;
  const celcius = document.getElementById("celcius")!;
  const feelsLike = document.getElementById("feelsLike")!;
  const wind = document.getElementById("wind")!;
  const humidity = document.getElementById("humidity")!;

  cityName.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
  weather.innerText = weatherData.weather[0].main;
  temperature.innerText = `${Math.floor(weatherData.main.temp - 273.15)}`;
  celcius.innerText = `°C`;
  feelsLike.innerText = `Feels like: ${Math.floor(
    weatherData.main.feels_like - 273.15
  )} °C`;
  wind.innerText = `Wind: ${Math.floor(weatherData.wind.speed)} MPH`;
  humidity.innerText = `Humidity: ${weatherData.main.humidity} %`;
  search.value = "";
};

const createWeatherIcon = (data: object) => {
  data = weatherData;
  const weatherIcon = document.getElementById(
    "weatherIcon"
  ) as HTMLImageElement;
  const weatherType = weatherData.weather[0].main;
  const clearArr = ["Clear"];
  const cloudArr = ["Clouds", "Haze"];
  const rainArr = ["Rain", "Drizzle", "Mist"];

  if (clearArr.includes(weatherType)) {
    document.body.className = "clear";
    weatherIcon.src = "./assets/circle.svg";
  }
  if (cloudArr.includes(weatherType)) {
    document.body.className = "clouds";
    weatherIcon.src = "./assets/cloud.svg";
  }
  if (rainArr.includes(weatherType)) {
    document.body.className = "rain";
    weatherIcon.src = "./assets/raindrops.svg";
  }
};

search.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${e.key}&appid=b75119bca09124d69520a444216b1db2`
    )
      .then((res) => res.json())
      .then((data) => {
        createWeatherPage(data);
        createWeatherIcon(data);
      })
      .catch((error) => console.error("SOMETHING IS WRONG", error));
  }
});

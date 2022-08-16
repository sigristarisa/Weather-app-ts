const search = document.getElementById("search") as HTMLInputElement;

interface WeatherData {
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
}

const createWeatherPage = (data: object) => {
  let gotData: WeatherData = {
    weather: data.weather,
    main: data.main,
    wind: data.wind,
    sys: data.sys,
    name: data.name,
  };
  const cityName = document.getElementById("cityName")!;
  const weather = document.getElementById("weather")!;
  const temperature = document.getElementById("temperature")!;
  const celcius = document.getElementById("celcius")!;
  const feelsLike = document.getElementById("feelsLike")!;
  const wind = document.getElementById("wind")!;
  const humidity = document.getElementById("humidity")!;

  cityName.innerText = `${gotData.name}, ${gotData.sys.country}`;
  weather.innerText = gotData.weather[0].main;
  temperature.innerText = `${Math.floor(gotData.main.temp - 273.15)}`;
  celcius.innerText = `°C`;
  feelsLike.innerText = `Feels like: ${Math.floor(
    gotData.main.feels_like - 273.15
  )} °C`;
  wind.innerText = `Wind: ${Math.floor(gotData.wind.speed)} MPH`;
  humidity.innerText = `Humidity: ${gotData.main.humidity} %`;
  search.value = "";
};

const createWeatherIcon = (data: object) => {
  let gotData: WeatherData = {
    weather: data.weather,
  };
  const weatherIcon = document.getElementById(
    "weatherIcon"
  ) as HTMLImageElement;
  const weatherType = gotData.weather[0].main;
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
      `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=b75119bca09124d69520a444216b1db2`
    )
      .then((res) => res.json())
      .then((data) => {
        createWeatherPage(data);
        createWeatherIcon(data);
      })
      .catch((error) => console.error("SOMETHING IS WRONG", error));
  }
});

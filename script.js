var search = document.getElementById("search");
var createWeatherPage = function (data) {
    var gotData = {
        weather: data.weather,
        main: data.main,
        wind: data.wind,
        sys: data.sys,
        name: data.name
    };
    var cityName = document.getElementById("cityName");
    var weather = document.getElementById("weather");
    var temperature = document.getElementById("temperature");
    var celcius = document.getElementById("celcius");
    var feelsLike = document.getElementById("feelsLike");
    var wind = document.getElementById("wind");
    var humidity = document.getElementById("humidity");
    cityName.innerText = "".concat(gotData.name, ", ").concat(gotData.sys.country);
    weather.innerText = gotData.weather[0].main;
    temperature.innerText = "".concat(Math.floor(gotData.main.temp - 273.15));
    celcius.innerText = "\u00B0C";
    feelsLike.innerText = "Feels like: ".concat(Math.floor(gotData.main.feels_like - 273.15), " \u00B0C");
    wind.innerText = "Wind: ".concat(Math.floor(gotData.wind.speed), " MPH");
    humidity.innerText = "Humidity: ".concat(gotData.main.humidity, " %");
    search.value = "";
};
var createWeatherIcon = function (data) {
    var gotData = {
        weather: data.weather
    };
    var weatherIcon = document.getElementById("weatherIcon");
    var weatherType = gotData.weather[0].main;
    var clearArr = ["Clear"];
    var cloudArr = ["Clouds", "Haze"];
    var rainArr = ["Rain", "Drizzle", "Mist"];
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
search.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(search.value, "&appid=b75119bca09124d69520a444216b1db2"))
            .then(function (res) { return res.json(); })
            .then(function (data) {
            createWeatherPage(data);
            createWeatherIcon(data);
        })["catch"](function (error) { return console.error("SOMETHING IS WRONG", error); });
    }
});

var bolt = '<i class="fas fa-bolt fa-2x"></i>';
var wind = '<i class="fas fa-wind fa-2x"></i>';
var smog = '<i class="fas fa-smog fa-2x"></i>';
var cloud = '<i class="fas fa-cloud fa-2x"></i>';
var sun = '<i class="fas fa-sun fa-2x"></i>';
var cloud_sun_rain = '<i class="fas fa-cloud-sun-rain fa-2x"></i>';
var cloud_sun = '<i class="fas fa-cloud-sun fa-2x"></i>';
var cloud_heavy_rain = '<i class="fas fa-cloud-showers-heavy fa-2x"></i>';
var cloud_low_rain = '<i class="fas fa-cloud-rain fa-2x"></i>';
var cloud_moon_rain = '<i class="fas fa-cloud-moon-rain fa-2x"></i>';
var snowflake = '<i class="fas fa-snowflake fa-2x"></i>';
var cloud_moon = '<i class="fas fa-cloud-moon fa-2x"></i>';
var moon = '<i class="fas fa-moon fa-2x"></i>';
var meteor = '<i class="fas fa-meteor fa-2x"></i>';

var defaultLong = -73.567256;
var defaultLat = 45.5016889;

var defaultPosition = {coords : {longitude : defaultLong, latitude: defaultLat}};

function showPosition(position) {
  document.getElementById("weather").innerText = "Latitude: " + position.coords.latitude +
    " Longitude: " + position.coords.longitude;
}

function getWeatherIcon(desc) {
  switch (desc.main) {
    case "Clear":
      return sun;
      break;
    case "Thunderstorm":
      return bolt;
      break;
    case "Clouds":
      if (desc.description.includes("few clouds") || desc.description.includes("scattered clouds")) {
        return cloud_sun_rain;
      } else {
        return cloud;
      }
      break;
    case "Mist":
      return smog;
      break;
    case "Fog":
      return smog;
      break;
    case "Snow":
      return snowflake;
      break;
    case "Rain":
      return cloud_heavy_rain;
      break;
    default:
      return meteor;
      break;
  }
}

function showWeather(position) {
  var log = position.coords.longitude;
  var lat = position.coords.latitude;
  setCookie(log, lat);
  $.getJSON(encodeURI("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + log + "&units=metric&appid=81ed7734b43aa7a548bb79e012b81cae")).done(function (data) {
    var result = data.main.temp + "&#8451  " + getWeatherIcon(data.weather[0]);
    document.getElementById("weather").innerHTML = result;
  }).fail(function () {
    alert("L'api ne répond pas!");
  });
}

function getLocation() {
  if (checkCookie() == false) {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else {
      return "Geolocation is not supported by this browser.";
    }
  } else {
    showWeather(getPositionFromCookie(getCookie()));
  }
}

function showError(error) {
  showWeather(defaultPosition);
}

function setCookie(long, lat) {
  var d = new Date();
  d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = "weatherPos=" + long + "/" + lat + ";" + expires + ";path=/";
}

function getCookie() {
  var cookieName = "weatherPos=";
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var element = cookies[i];
    while (element.charAt(0) == ' ') {
      element = element.substring(1);
    }
    if (element.includes(cookieName)) {
      return element.substring(cookieName.length, element.length);
    }
  };
  return "";
}

function checkCookie() {
  var user = getCookie();
  if (user == "") {
    return false;
  } else {
    return true;
  }
} 

function getPositionFromCookie(pos){
  var posSplit = pos.split('/');
  var retPosition = {coords : {longitude : posSplit[0], latitude: posSplit[1]}};
  return retPosition;
}
// Done by Ubaid Delawala - 301150030

//Weather Section

//get weather details based on city name
var city = document.getElementById('userInput').value;
     weatherInfo(city);
     
function weatherInfo( city ) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=')  
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        drawWeather(data);
        console.log(data);
    })
    .catch(function() {
        //catch errors
    });
  }

//get weather details based on geolocation
function geoLocation(){
    navigator.geolocation.getCurrentPosition(geoWeatherInfo);

function geoWeatherInfo(position) { 

      fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ position.coords.latitude + '&lon='+ position.coords.longitude +'&appid=')  
     .then(function(resp) { return resp.json() })
     .then(function(data) {
         drawWeather(data);
         console.log(data);
     })
     .catch(function() {
         //catch errors
     });
}
}


function drawWeather(d) {
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    var iconID = d.weather[0].icon;

    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location').innerHTML = d.name;
    document.getElementById('icon').src = 'http://openweathermap.org/img/wn/'+ iconID +'@2x.png';

}

 document.getElementById('cityWeather').addEventListener("click",window.onload = function() {
     var city = document.getElementById('userInput').value;
     weatherInfo(city);
   })

  document.getElementById('userWeather').addEventListener("click",window.onload = geoLocation)


  // Map section

  navigator.geolocation.getCurrentPosition(
    function (position) {
       initMap(position.coords.latitude, position.coords.longitude);
       function initMap(lat, lng) {

        var myLatLng = {
           lat,
           lng
        };
     
        var map = new google.maps.Map(document.getElementById('map'), {
           zoom: 8,
           center: myLatLng
        });
     
        var marker = new google.maps.Marker({
           position: myLatLng,
           map: map,
        });
     }
    },
    function errorCallback(error) {
       console.log(error)
    }
 );
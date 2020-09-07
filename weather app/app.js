//  api-key 8e87fb1347cf5cd13af088deb36f3a08

// var date = new Date(1595268000* 1000);

// var daynumber = date.getDate();
// var dayofTheweek = date.getDay();


// console.log(dayofTheweek);
$(document).ready(function(){ 
var searchInput = $("#search-input")
var searchBtn = $("#search-btn")
var divCurrent = $(".current-weather")
var moreInfo = $(".more-info")
var latitud = 0;
var longitude = 0;
var rowForecast = $(".forecast")
var daysOftheWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
var months = ["Jan", "Fev", "Mar", "April", "Mai", "Jun", "Julho", "Ago", "Set", "Out", "Nov", "Dez"];
var userLat = 0;
var userLon = 0;
var favicon = $("<img src = './imgs/estrela-branca.svg' class = 'favicon'>");
var favicon2 = $("<img src = './imgs/estrela.svg' class = 'favicon2'>");


function getCurrentWeather() {
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.val() + "&units=metric&appid=8e87fb1347cf5cd13af088deb36f3a08&lang=pt_br",
        dataType: "json",
        success: function (response, textStatus) {
            searchInput.val("")
            console.log(response)
            latitud = response.coord.lat;
            longitude = response.coord.lon;


            console.log(response) 
            console.log(favicon);
            $(".name").text("   " + response.name);
            // $(".div-favicon").append(favicon);
            $(".div-current-temperature").text(Math.floor(Number(response.main.temp)) + "\xB0 C")
            var icon = $("<img class='icon-current' src ='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>")
           

            moreInfo.text(response.weather[0].description)

            $(".span-feels-like").text(Math.floor(response.main.feels_like) + "\xB0 C");
            $(".span-humidity").text(response.main.humidity + " %")
            icon.appendTo($("#icon-span"));

            console.log(icon)
            getForecast();

        },

        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    })
}


function getForecast() {
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitud + "&lon=" + longitude + "&units=metric&appid=8e87fb1347cf5cd13af088deb36f3a08&lang=pt_br",
        dataType: "json",
        success: function (response, textStatus) {
            
            console.log(response)
            for (var i = 1; i <= 6; i++) {
                var date = new Date((response.daily[i].dt) * 1000);




                var weekday = date.getDay();
                var portugueseDays = daysOftheWeek[weekday];
                var getDate = date.getDate();
                var month = date.getMonth();
                portugueseMonths = months[month];
                var temperatureMax = response.daily[i].temp.max;
                var temperatureMin = response.daily[i].temp.min;

                var newRow = $("<div class = 'row new-div text-left'></div>");
                var divDate = $("<div class = 'col-lg-6 col-7 div-date'></div>");
                var minMax = $("<div class = 'col-2 col-lg-1 min-max'></div>");
                var divIcon = $("<div class = 'col-3 col-lg-5 div-icon'></div>");
                var divDescription = $("<div class = 'col-4 col-lg-5 div-description'></div>");
                var divSens = $("<div class = 'col-4 col-lg-1 div-sens '></div>");
                var divHumid = $("<div class = 'col-4 col-lg-6 div-humid'></div>");
                var spanSens = $("<span class='span-sens'></span>");
                var spanHumid = $("<span class='span-humid'></span>");

                var iconForecast = $("<img class='icon-forecast' src ='http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png'>")
                rowForecast.append(newRow);
                newRow.append(divDate);
                newRow.append(divDate);
                newRow.append(minMax);
                newRow.append(divIcon);
                divIcon.append(iconForecast);
                divHumid.append(spanHumid);
                divSens.append(spanSens)
                newRow.append(divHumid);
                newRow.append(divSens);
                newRow.append(divDescription);

                if(i===1){
                    portugueseDays = "Amanhã"
                }

                divDate.text(portugueseDays + ", " + getDate + "/" + portugueseMonths);
                minMax.text(Math.floor(temperatureMin) + "\xB0" + "/" + Math.floor(temperatureMax) + "\xB0");
                divDescription.text(response.daily[i].weather[0].description);
                divSens.append($("<p>" + Math.floor(response.daily[i].feels_like.day) + "\xB0 C </p>"))
                spanSens.text("Sensação")
                spanHumid.text("Umidade")
                divHumid.append($("<p>" + response.daily[i].humidity + "%</p>"))

                newRow.on("click", function(){
                    if($(this).hasClass("new-div")){
                        $(this).removeClass("new-div");
                        $(this).addClass("open")
                       
                    }
                    else{
                        $(this).removeClass("open");
                        $(this).addClass("new-div")
                    }

                })
            }
        },

        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    })
}

searchBtn.on("click", function () {
    $("#icon-span").empty();
    rowForecast.empty();
    getCurrentWeather();
})

function getLocation() {
    window.navigator.geolocation.getCurrentPosition(function (position) {
        var userLat = (position.coords.latitude).toFixed(2);
        var userLon = (position.coords.longitude).toFixed(2);
        loadLocation(userLat, userLon)
    });

}

function loadLocation(value1, value2) {
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + value1 + "&lon=" + value2 + "&units=metric&appid=8e87fb1347cf5cd13af088deb36f3a08&lang=pt_br",
        dataType: "json",
        success: function (response, textStatus) {
            console.log(response)
            latitud = response.coord.lat;
            longitude = response.coord.lon;
            console.log(response);

            
            console.log(favicon);
            $(".name").text("   " + response.name);
            // $(".div-favicon").append(favicon);
            $(".div-current-temperature").text(Math.floor(Number(response.main.temp)) + "\xB0 C")
            var icon = $("<img class='icon-current' src ='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>")

            moreInfo.text(response.weather[0].description)

            $(".span-feels-like").text(Math.floor(response.main.feels_like) + "\xB0 C");
            $(".span-humidity").text(response.main.humidity + " %")
            icon.appendTo($("#icon-span"));
            console.log(icon)
            getForecast();

        },

        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    })
}


getLocation();

})
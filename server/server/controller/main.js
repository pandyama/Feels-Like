var express = require('express');
var bodyParser = require('body-parser');
const http = require('https');
var app = express();
const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var apiKey = '0fe37647bf3c4095418a1c5392bb60cc';

var options = {
    host: 'api.openweathermap.org',
    port: 80,
    path: '/data/2.5/weather?q=&appid='+apiKey,
    method: 'GET'
  };

  function GetDays(startDay, daysToAdd){
	var days = [];

	for(var i = 0; i < daysToAdd; i++){
		var currentDate = new Date();
		currentDate.setDate(startDay.getDate()+i);
		days.push(DayAsString(currentDate.getDay()));
	}
	return days;
}

function DayAsString(dayIndex) {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    return weekdays[dayIndex];
}

let city = 'toronto';
let lat = 0;
let lon = 0;
let current = 0;
let current_feels = 0;
let current_description = "";

exports.weather = function(query, callback){
    city = query.headers.city;
    console.log(city);
    //city = "toronto";
    options.path = '/data/2.5/weather?q='+city+'&appid='+apiKey;
    console.log("Hello");
    // http.request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0fe37647bf3c4095418a1c5392bb60cc`, function(res){

    //     let data = '';

    //     res.on('data', function(chunk){
    //         data += chunk;
    //     });

    //     res.on('end', function(chunk){
    //         let weather = JSON.parse(data);
    //         console.log(weather);
    //         let weatherText;
    //     }).on('error', function(err){
    //         console.log(err.message);
    //     });


    // }).end();


    var forecast = [];
    var current = [];

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0fe37647bf3c4095418a1c5392bb60cc`)
        .then(res => {
            // console.log(res.data);
            // console.log(res.data.coord.lat);
            lat = res.data.coord.lat;
            lon = res.data.coord.lon;

            axios.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=0fe37647bf3c4095418a1c5392bb60cc`)
                .then(res =>{
                    //console.log(res.data);
                    var test2 = [];
                    test2.push(Math.round(res.data.current.temp-273.15));
                    test2.push(Math.round(res.data.current.feels_like-273.15));
                    test2.push(res.data.current.weather[0].description);
                    forecast.push(test2);

                    for(var i = 0; i < 5; i++){
                        var test = [];
                        test.push(Math.round((res.data.daily[i].temp.min)-273.15));
                        test.push(Math.round((res.data.daily[i].temp.max)-273.15));
                        test.push(res.data.daily[i].weather[0].description);
                        
                        forecast.push(test);

                    }
                    console.log(res.data.daily[0].temp.max);
                    console.log(res.data.daily[0].temp.min);
                    console.log(res.data.daily[0].weather[0].description);

                    console.log(forecast);
                    callback.send(forecast);
                    


                })
                .catch(err => {
                    console.log(err);
                })

        })
        .catch(err => {
            console.log(err);
        })
}
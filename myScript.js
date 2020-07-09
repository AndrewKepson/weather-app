// * Dynamically create city buttons with ID of city name
// * Pull data from api and use onclick to pull id from button and set the city name for data pulled from the api (may need to empty div at beginning of function)
// * Display it on the page
// * Click to get id from search input and set city name to it

$(document).ready(function(){



var key = '63aa044b0ff611c7351bd3f3fe384feb';
//var cityName;




$('#search-button').on('click', function() {
	event.preventDefault();
	var cityName = $('#user-search').val();
	console.log(cityName);
	$('#user-search').val("");
	weatherSearch(cityName);
	weatherForecast(cityName);


});

function weatherSearch(cityName) {
	var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=63aa044b0ff611c7351bd3f3fe384feb&units=imperial';
	$.ajax({
		url: queryUrl,
		method: "GET",
		dataType: "json"	
	}).then(function(response) {
		var results =response;
		console.log(results);
		var currentCity = $('<h2>').text(cityName + " date");
		var currentTemp = $('<p>').text(results.main.temp);
		console.log(results.main.temp);
		var currentHum = $('<p>').text(results.main.humidity);
		console.log(results.main.humidity);
		var currentWind = $('<p>').text(results.wind.speed);
		var currentIcon = $('<img>').attr('src','https://openweathermap.org/img/w/' + results.weather[0].icon + '.png');
		$('#current-header').html(currentCity,currentIcon); //Set first letter to uppercase
		$('#current-temp').append(currentTemp);
		$('#current-humidity').append(currentHum);
		$('#current-wind').append(currentWind);

	})
}

function weatherForecast(cityName) {
	var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=63aa044b0ff611c7351bd3f3fe384feb&units=imperial';
	$.ajax({
	url: queryUrl,
	method: "GET",
	dataType: "json"
}).then(function(response) {
	var results = response;
	console.log(results);

	for (i=0;i<results.list.length;i++) {
		var icon = $('<img>').attr('src','https://openweathermap.org/img/w/' + results.weather[i].icon + '.png');
		var date = $('<p>').text(results.list[i].dt_text);
		console.log(results.list[0].dt_text);
		var humidity = $('<p>').text(results.list[i].main.humidity);
		var infoCard = $('<h5 class="card-header>').text(date).append('div class="card-body"').html('<p>').text(icon).append('<div class="card-footer"').text(humidity);
		$('#forecast-container').append(infoCard);
	}

});

}

//Add function to get UV index

});


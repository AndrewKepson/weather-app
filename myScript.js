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
	$('#user-search').val("");
	weatherSearch(cityName);
	weatherForecast(cityName);
	$('#my-cities')

});
// Function to get and display current weather info
function weatherSearch(cityName) {
	var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=63aa044b0ff611c7351bd3f3fe384feb&units=imperial';
	$.ajax({
		url: queryUrl,
		method: "GET",
		dataType: "json"	
	}).then(function(response) {
		var results = response;
		var currentCity = $('<h2>').text(cityName + " date");
		var currentTemp = $('<p>').text(results.main.temp);
		var currentHum = $('<p>').text(results.main.humidity);
		var currentWind = $('<p>').text(results.wind.speed);
		var currentIcon = $('<img>').attr('src','https://openweathermap.org/img/w/' + results.weather[0].icon + '.png');
		$('#current-header').html(currentCity); //Set first letter to uppercase
		$('#current-header').append(currentIcon);
		$('#current-temp').append(currentTemp);
		$('#current-humidity').append(currentHum);
		$('#current-wind').append(currentWind);

	})
}
//Function to get and display 5-day forecast info
function weatherForecast(cityName) {
	var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=63aa044b0ff611c7351bd3f3fe384feb&units=imperial';
	$.ajax({
	url: queryUrl,
	method: "GET",
	dataType: "json"
}).then(function(response) {
	var results = response;
	console.log(results);
	
	var days = results.list.filter(function (forecast){
		return forecast.dt_txt.includes("12:00:00")
	});
	console.log(days);

	for (i=0;i<days.length;i++) {
		var day = moment(days[i].dt, "X").format("dddd") //Grabs date from the object and converts to day name using moment.js 
		var icon = $('<img>').attr('src','https://openweathermap.org/img/w/' + days[i].weather[0].icon + '.png');
		var date = $('<p>').text(day);
		var humidity = days[i].main.humidity;
		var city = results.city.name;
		var temp = days[i].main.temp_max;
		var weatherCard = $('<div>').attr({
			'class': 'card text-white bg-primary mb-3',
			'style': 'max-width:18rem'
		});

		var cardHead = $('<div>').attr('class','card-header');
		var cardBody = $('<div>').attr('class','card-body');
		var cardTitle = $('<h5>').attr('class','card-title');
		var cardText = $('<p>').attr('class','card-text');
			cardTitle.html(icon);
			cardText.html(weather + '<br><br>' + 'High: ' (temp) + 'F' + '<br><br>' + 'Humidity: ' + humidity);
			weatherCard.append(cardHead,cardBody);
			cardBody.append(cardTitle,cardText);
			cardHead.text(day);
			console.log(weatherCard);
			$('#forecast-deck').append(weatherCard);
		// var leaveAccordion = $('<div class="accordion-title">');
		// leaveAccordion.text(city);
		// 	$("#my-cities").append(leaveAccordion);
	}

});

}

//Add function to get UV index

});


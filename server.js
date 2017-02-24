var koa = require('koa');
var app = koa();
var request = require('koa-request');
const PORT = process.env.PORT || 3005;

//insert your location here
var location = '46 Stewart Street, Toronto, Canada';

app.use(function*(){
    var options = {
    	url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+ location +',+CA&key=AIzaSyB5YU9u8D8LQoHXqPDWO_FQD4QQ3ebEiTo',
        headers: { 'User-Agent': 'request' }
    }
    var response = yield request(options);
    var address = JSON.parse(response.body);
    var coordinates = address.results[0].geometry.location
    console.log(coordinates);

    var options = {
    	url: 'https://api.darksky.net/forecast/9addcc2fcf2f559e056919e7297c5c3b/'+ coordinates.lat +','+ coordinates.lat + '',
        headers: { 'User-Agent': 'request' }
    };
    var response2 = yield request(options);
    var weather = JSON.parse(response2.body);
    console.log(weather.currently);

    this.body = 'the temperature in ' + location + ' right now is ' + weather.currently.temperature + '°F';
    
});

app.listen(PORT);
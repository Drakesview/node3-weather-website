const request = require('request')


const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c7beb23f729642d4560044b3290d0816/'+latitude +','+ longitude+'?units=auto'
    request({url , json:true}, (error,{body})=>{
        if(error) {
            callback('unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined,                 
                body.daily.data[0].summary + ` It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.
                Lows of ${body.daily.data[0].temperatureLow} degrees and highs of ${body.daily.data[0].temperatureHigh} degrees`)
                
        }
    })
}

module.exports = forecast
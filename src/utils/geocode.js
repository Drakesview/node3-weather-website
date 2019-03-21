const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZHJha2VzdmlldyIsImEiOiJjanQwNXF4OGwwM3A4NDlwa2QyNGI4ZHl4In0.mZFRA0XdNI_WFRoSRJ7EuA&limit=1'

    request({url,  json:true}, (error, {body})=>{
        if (error) {
            callback('Unable to connect to mapbox service')
        } else if (body.features.length === 0) {
            callback('Unable to find location please try again.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitute: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

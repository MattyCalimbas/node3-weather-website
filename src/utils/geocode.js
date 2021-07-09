const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWF0dHktYzg5IiwiYSI6ImNrbXh6N2V1NjBiOW4yem11NXF5a2V4cGQifQ.UqmyNTkVXkuQ6ukWttyzgA&limit=1'
    
    
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect location services!') 
        } else if ( body.features.length === 0) {
            callback('Unable to find location, try another search.')

        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    })
}

module.exports = geocode

//Geocoding - pk.eyJ1IjoibWF0dHktYzg5IiwiYSI6ImNrbXh6N2V1NjBiOW4yem11NXF5a2V4cGQifQ.UqmyNTkVXkuQ6ukWttyzgA 
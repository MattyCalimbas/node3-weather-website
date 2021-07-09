const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ae44f6d9d2d16330bc1f3fe9ab8487a6&query='+ latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error){
            callback('Unable to connect.')
        } else if (body.error) {
            callback('Unable to find location.')
    
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out' + ' in ' + body.location.name)
        }
    }) 
}

module.exports = forecast
